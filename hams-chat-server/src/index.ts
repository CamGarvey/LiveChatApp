import { PrismaClient } from '@prisma/client';
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

const main = async () => {
  const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

  const app = express();

  var whitelist = ['https://studio.apollographql.com', process.env.CORS_ORIGIN];
  var corsOptions = {
    origin: function (origin: string, callback: Function) {
      console.log(origin);

      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  // app.use(cors(corsOptions));

  app.use(
    auth({
      audience: 'undefined',
      issuerBaseURL: 'localhost:4000',
      strict: false,
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

  const pubsub = new RedisPubSub({
    publisher: new Redis(pubsubOptions),
    subscriber: new Redis(pubsubOptions),
  });

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
    context: ({ req }) => {
      return {
        user,
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
