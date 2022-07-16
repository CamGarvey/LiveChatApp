import { PrismaClient } from '@prisma/client';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export interface IContext {
  userId: string;
  prisma: PrismaClient;
  pubsub: RedisPubSub;
  auth: IAuthorizer;
}

export interface IAuthorizer {
  canCreateDirectMessageChat: (friendId: string) => Promise<boolean>;
  canCreateGroupChat: (memberIds: string[]) => Promise<boolean>;
  canViewChat: (chatId: string) => Promise<boolean>;
  canUpdateGroupChat: (
    chatId: string,
    addMemberIds: string[]
  ) => Promise<boolean>;
  canDeleteChat: (chatId: string) => Promise<boolean>;
  canCreateMessage: (chatId: string) => Promise<boolean>;
  canViewMessage: (messageId: string) => Promise<boolean>;
}
