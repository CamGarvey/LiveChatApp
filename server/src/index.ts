import cors from 'cors';
import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createServer } from 'http';
import Redis, { RedisOptions } from 'ioredis';
import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';

import hashids from 'hashids';
import { Authorizer } from './lib/authorizer';
import prisma from './lib/clients/prisma';
import authRouter from './routes/auth';
import { createGraphqlServer } from './graphql-server';

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

const main = async () => {
  // Create Express app
  const app = express();

  app
    .use(express.json())
    .use('/auth', authRouter)
    .use(
      cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'], // <-- allow frontend & apollo studio
        credentials: true,
      })
    )
    .use(
      '/grahpql/*',
      auth({
        audience: process.env.AUTH0_AUDIENCE,
        jwksUri: process.env.AUTH0_JWKS_URI,
        tokenSigningAlg: process.env.AUTH0_SIGNING_ALG,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
      })
    );

  const redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    retryStrategy: (times: any) => {
      // reconnect after
      return Math.min(times * 50, 2000);
    },
  };

  // Set up the pubsub server
  const pubsub = new RedisPubSub({
    publisher: new Redis(redisOptions),
    subscriber: new Redis(redisOptions),
  });

  const authorizer = new Authorizer(prisma);

  const httpServer = createServer(app);

  // Set up WebSocketServer on graphql endpoint
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const server = createGraphqlServer({
    pubsub,
    auth: authorizer,
    getUserIdFromToken,
    wsServer,
    httpServer,
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
