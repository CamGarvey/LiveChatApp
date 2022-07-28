import { PrismaClient } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { IAuthorizer } from '../lib/authorizer.interface';
export interface IContext {
  userId: number;
  prisma: PrismaClient;
  pubsub: RedisPubSub;
  auth: IAuthorizer;
}
