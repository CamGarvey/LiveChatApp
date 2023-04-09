import cors from 'cors';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createServer, Server } from 'http';
import Redis, { RedisOptions } from 'ioredis';
import jwt from 'jsonwebtoken';
import hashids from 'hashids';
import { WebSocketServer } from 'ws';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { useServer } from 'graphql-ws/lib/use/ws';
import { GraphQLError } from 'graphql';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { IContext } from './graphql/context.interface';
import { Authorizer } from './lib/authorizer';
import prisma from './lib/clients/prisma';
import authRouter from './routes/auth';
import { schema } from './graphql';

const hash = new hashids(
  process.env.HASH_SALT,
  parseInt(process.env.HASH_MIN_LENGTH)
);

const getUserIdFromToken = (token: string) => {
  // Take off Bearer part of token e.g Bearer eyJhbGciOiJSUzI1NiIs...
  const strippedToken = token.replace('Bearer ', '');
  // Decode token. No need to verify since auth middleware takes care of that
  const decoded = jwt.decode(strippedToken);
  // Parse decoded token
  const payload = JSON.parse(JSON.stringify(decoded));
  // Get user id from token payload
  // Since user_id is a custom field in the Auth0 accesstoken Auth0 requires name of field
  // to be {API domain}/{field name}
  let [userId] = hash.decode(payload[process.env.DOMAIN + '/user_id']);

  return Number(userId);
};

const createWebSocket = ({
  server,
  createContext,
}: {
  server: Server;
  createContext: (token: string) => IContext;
}) => {
  // Set up WebSocketServer on graphql endpoint
  const wsServer = new WebSocketServer({
    server,
    path: '/graphql',
  });

  return useServer(
    {
      schema,
      context: (req) => {
        const token = req?.connectionParams?.Authorization;
        if (typeof token != 'string' || !token) {
          throw new GraphQLError('No token');
        }
        return createContext(token);
      },
    },
    wsServer
  );
};

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  retryStrategy: (times: any) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

const main = async () => {
  // Set up the pubsub server
  const pubsub = new RedisPubSub({
    publisher: new Redis(redisOptions),
    subscriber: new Redis(redisOptions),
  });

  const authorizer = new Authorizer(prisma);

  const createContext = (token: string) => {
    const currentUserId = getUserIdFromToken(token);
    if (!currentUserId) {
      throw new GraphQLError('No user');
    }
    authorizer.currentUserId = currentUserId;
    return {
      currentUserId,
      prisma,
      pubsub,
      auth: authorizer,
    };
  };

  const app = express();
  const httpServer = createServer(app);
  const wsServerCleanUp = createWebSocket({
    server: httpServer,
    createContext,
  });

  const server = new ApolloServer<IContext>({
    schema,
    csrfPrevention: true,
    introspection: true,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanUp.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app
    .use(express.json())
    .use('/auth', authRouter)
    .use(
      cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true,
      })
    )
    .use(
      '/graphql',
      cors<cors.CorsRequest>(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const token = req.headers.authorization;
          if (!token) {
            throw new GraphQLError('No token');
          }
          return createContext(token);
        },
      }),
      auth({
        audience: process.env.AUTH0_AUDIENCE,
        jwksUri: process.env.AUTH0_JWKS_URI,
        tokenSigningAlg: process.env.AUTH0_SIGNING_ALG,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
      })
    );

  const port = parseInt(process.env.PORT);

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

main().catch(console.error);
