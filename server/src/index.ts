import express from 'express';
import cors from 'cors';
import {
  ApolloServerPluginDrainHttpServer,
  ForbiddenError,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken';

import authRouter from './routes/auth';
import { schema } from './graphql';
import prisma from './lib/clients/prisma';
import { IContext } from './graphql/context.interface';
import { Authorizer } from './lib/clients/authorizer';
import hashids from 'hashids';

const main = async () => {
  // Create Express app
  const app = express();

  app.use(express.json());

  // Set up rest routes
  app.use('/auth', authRouter);

  // Set up CORS
  var corsOptions = {
    origin: ['http://localhost:3000', 'https://studio.apollographql.com'], // <-- allow frontend & apollo studio
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(
    '/grahpql/*',
    auth({
      audience: process.env.AUTH0_AUDIENCE,
      jwksUri: process.env.AUTH0_JWKS_URI,
      tokenSigningAlg: process.env.AUTH0_SIGNING_ALG,
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    })
  );

  const httpServer = createServer(app);

  const pubsubOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    retryStrategy: (times: any) => {
      // reconnect after
      return Math.min(times * 50, 2000);
    },
  };

  // Set up the pubsub server
  const pubsub = new RedisPubSub({
    publisher: new Redis(pubsubOptions),
    subscriber: new Redis(pubsubOptions),
  });

  const authorizer = new Authorizer(prisma);

  // Set up WebSocketServer on graphql endpoint
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const hash = new hashids(
    process.env.HASH_SALT,
    parseInt(process.env.HASH_MIN_LENGTH)
  );

  const getPayloadFromBearerToken = (token: string) => {
    // Take off Bearer part of token e.g Bearer eyJhbGciOiJSUzI1NiIs...
    const strippedToken = token.replace('Bearer ', '');
    // Decode token. No need to verify since auth middleware takes care of that
    const decoded = jwt.decode(strippedToken);
    // Parse decoded token
    return JSON.parse(JSON.stringify(decoded));
  };

  const getUserIdFromTokenPayload = (payload: any): number => {
    // Get user id from token payload
    // Since user_id is a custom field in the Auth0 accesstoken Auth0 requires name of field
    // to be {API domain}/{field name}
    let [userId] = hash.decode(payload[process.env.DOMAIN + '/user_id']);
    return Number(userId);
  };

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema,
      context: (req) => {
        const token = req.connectionParams.Authorization;
        if (!token) {
          throw new ForbiddenError('No token');
        }
        const payload = getPayloadFromBearerToken(token.toString());
        if (!payload) {
          throw new ForbiddenError('Invalid token');
        }
        const userId = getUserIdFromTokenPayload(payload);
        authorizer.userId = userId;

        return {
          userId,
          prisma,
          pubsub,
          auth: authorizer,
        };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: ({ req }): IContext => {
      // Get access token from request
      const token = req.headers.authorization;
      if (!token) {
        throw new ForbiddenError('No token');
      }
      const payload = getPayloadFromBearerToken(token);
      if (!payload) {
        throw new ForbiddenError('Invalid token');
      }
      const userId = getUserIdFromTokenPayload(payload);

      if (!userId) {
        throw new ForbiddenError('Invalid user');
      }

      authorizer.userId = userId;

      return {
        userId,
        prisma,
        pubsub,
        auth: authorizer,
      };
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: true,
  });

  const port = parseInt(process.env.PORT);

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(
      `Server is now running on http://localhost:${port}${server.graphqlPath}`
    );
  });
};

main().catch(console.error);
