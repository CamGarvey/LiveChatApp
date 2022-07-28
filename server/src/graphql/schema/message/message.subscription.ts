import { withFilter } from 'graphql-subscriptions';
import { nonNull, subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';

export const MessagesSubscription = subscriptionField('messages', {
  type: 'Message',
  description: 'Subscribe to any created/updated/deleted messages',
  args: {
    chatId: nonNull(hashIdArg()),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('message.*', { pattern: true }),
      (payload, variables) => {
        return payload.chatId === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve: (payload: any) => payload,
});

export const MessageCreatedSubscription = subscriptionField('messageCreated', {
  type: 'InstantMessage',
  description: 'SUbscribe to created messages in chat',
  args: {
    chatId: nonNull(hashIdArg()),
  },
  authorize: async (_, { chatId }, { auth }) => await auth.canViewChat(chatId),
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageCreated),
      (payload, variables) => {
        return payload.chatId === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve: (payload: any) => payload,
});

export const MessageDeletedSubscription = subscriptionField('messageDeleted', {
  type: 'DeletedMessage',
  description: 'Subscribe to deleted messages in chat',
  args: {
    chatId: nonNull(hashIdArg()),
  },
  authorize: async (_, { chatId }, { auth }) => await auth.canViewChat(chatId),
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageDeleted),
      (payload, variables) => {
        return payload.chatId === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve: (payload: any) => payload,
});

export const MessageUpdatedSubscription = subscriptionField('messageUpdated', {
  type: 'Message',
  description: 'Subscribe to updated messages in chat',
  args: {
    chatId: nonNull(hashIdArg()),
  },
  authorize: async (_, { chatId }, { auth }) => await auth.canViewChat(chatId),
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageUpdated),
      (payload, variables) => {
        return payload.chatId === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve: (payload: any) => payload,
});
