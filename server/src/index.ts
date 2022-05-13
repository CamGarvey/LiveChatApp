import express from 'express';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { schema } from './graphql';
import { ApolloServer } from 'apollo-server-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { auth } from 'express-oauth2-jwt-bearer';
import authRouter from './routes/auth';
import prisma from './lib/clients/prisma';

const main = async () => {
  // Create Express app
  const app = express();

  // Set up rest routes
  app.use('/auth', authRouter);

  // Set up CORS
  var corsOptions = {
    origin: 'http://localhost:3000', // <-- allow frontend
    credentials: true,
  };

  app.use(cors(corsOptions));

  // Set up auth on graphql endpoint
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

  // Set up WebSocketServer on graphql endpoint
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema,
      context: () => {
        return {
          prisma,
          pubsub,
        };
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: ({ req, res }) => {
      console.log({ req, res });
      return {
        prisma,
        pubsub,
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

  httpServer.listen(port, () => {
    console.log(
      `Server is now running on http://localhost:${port}${server.graphqlPath}`
    );
  });
};

main().catch(console.error);
