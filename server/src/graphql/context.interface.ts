import { PrismaClient } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export interface IContext {
  userId: number;
  prisma: PrismaClient;
  pubsub: RedisPubSub;
}
