import { PrismaClient } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export interface IContext {
  userId: string;
  prisma: PrismaClient;
  pubsub: RedisPubSub;
}
