import { PrismaClient } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export interface IContext {
  userId: number;
  prisma: PrismaClient;
  pubsub: RedisPubSub;
  auth: IAuthorizer;
}

export interface IAuthorizer {
  canCreateDirectMessageChat: (friendId: number) => Promise<boolean>;
  canCreateGroupChat: (memberIds: number[]) => Promise<boolean>;
  canViewChat: (chatId: number) => Promise<boolean>;
  canUpdateGroupChat: (
    chatId: number,
    addMemberIds: number[]
  ) => Promise<boolean>;
  canDeleteChat: (chatId: number) => Promise<boolean>;
  canCreateMessage: (chatId: number) => Promise<boolean>;
  canViewMessage: (messageId: number) => Promise<boolean>;
}
