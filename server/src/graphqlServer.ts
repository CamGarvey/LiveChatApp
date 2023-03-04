import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';

import { schema } from './graphql';
import prisma from './lib/clients/prisma';
import { IContext } from './graphql/context.interface';
import { IAuthorizer } from './lib/authorizer.interface';
import { GraphQLError } from 'graphql';

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
          throw new GraphQLError('Bad Request');
        }
        const token = req.connectionParams.Authorization;
        if (typeof token != 'string' || !token) {
          throw new GraphQLError('No token');
        }
        const currentUserId = getUserIdFromToken(token);
        auth.currentUserId = currentUserId;
        return {
          currentUserId,
          prisma,
          pubsub,
          auth,
        };
      },
    },
    wsServer
  );

  return new ApolloServer<IContext>({
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
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
};
