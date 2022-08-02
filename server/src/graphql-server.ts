import {
  ApolloServerPluginDrainHttpServer,
  ForbiddenError,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';

import { schema } from './graphql';
import prisma from './lib/clients/prisma';
import { IContext } from './graphql/context.interface';
import { IAuthorizer } from './lib/authorizer.interface';

interface Options {
  pubsub: RedisPubSub;
  auth: IAuthorizer;
  wsServer: WebSocketServer;
  httpServer: Server;
  getUserIdFromToken: (token: string) => number;
}

export const createGraphqlServer = ({
  pubsub,
  auth,
  getUserIdFromToken,
  wsServer,
  httpServer,
}: Options) => {
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema,
      context: (req): IContext => {
        if (!req?.connectionParams) {
          throw new Error('Bad Request');
        }
        const token = req.connectionParams.Authorization;
        if (typeof token != 'string' || !token) {
          throw new ForbiddenError('No token');
        }
        const userId = getUserIdFromToken(token);
        auth.userId = userId;
        return {
          userId,
          prisma,
          pubsub,
          auth,
        };
      },
    },
    wsServer
  );

  return new ApolloServer({
    schema,
    csrfPrevention: true,
    context: ({ req }): IContext => {
      // Get access token from request
      const token = req.headers.authorization;
      if (!token) {
        throw new ForbiddenError('No token');
      }
      const userId = getUserIdFromToken(token);

      if (!userId) {
        throw new ForbiddenError('Invalid user');
      }

      auth.userId = userId;

      return {
        userId,
        prisma,
        pubsub,
        auth,
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
};
