import { PrismaClient } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export interface IContext {
  prisma: PrismaClient;
  pubsub: RedisPubSub;
}
