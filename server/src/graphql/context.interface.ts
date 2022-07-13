import { PrismaClient } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export interface IContext {
  userId: string;
  prisma: PrismaClient;
  pubsub: RedisPubSub;
  auth: IAuth;
}

export interface IAuth {
  canViewChat: (userId: string, chatId: string) => Promise<boolean>;
}
