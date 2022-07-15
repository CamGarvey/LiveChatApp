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
  canAddMembersToChat: (
    chatId: string,
    memberIds: string[]
  ) => Promise<boolean>;
  canRemoveMembersFromChat: (chatId: string) => Promise<boolean>;
}
