import { ForbiddenError } from 'apollo-server-core';
import { withFilter } from 'graphql-subscriptions';
import { nonNull, stringArg, subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';

export const MessagesSubscription = subscriptionField('messages', {
  type: 'MessageResult',
  description: 'Subscribe to any created/updated/deleted messages',
  args: {
    chatId: nonNull(hashIdArg()),
  },
  authorize: async (_, { chatId }, { auth }) => await auth.canViewChat(chatId),
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('message.*', { pattern: true }),
      (payload, variables) => {
        return payload.id === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});

export const MessageDeletedSubscription = subscriptionField('messageDeleted', {
  type: 'DeletedMessage',
  description: 'SUbscribe to deleted message in chat',
  args: {
    chatId: nonNull(hashIdArg()),
  },
  authorize: async (_, { chatId }, { auth }) => await auth.canViewChat(chatId),
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageDeleted),
      (payload, variables) => {
        return payload.id === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});

export const MessageUpdatedSubscription = subscriptionField('messageUpdated', {
  type: 'MessageResult',
  description: 'Subscribe to updated messages in chat',
  args: {
    chatId: nonNull(hashIdArg()),
  },
  authorize: async (_, { chatId }, { auth }) => await auth.canViewChat(chatId),
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageUpdated),
      (payload, variables) => {
        return payload.id === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
