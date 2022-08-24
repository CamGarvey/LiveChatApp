import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import SubscriptionPayload from '../../../backing-types/subscription-payload';
import { Subscription } from '../../../backing-types';
import { hashIdArg } from '../../shared';
import { Message } from '@prisma/client';

export const MessagesSubscription = subscriptionField('messages', {
  type: 'MessageResult',
  description: 'Subscribe to any created/updated/deleted messages',
  args: {
    chatId: hashIdArg(),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('message.*', { pattern: true }),
      (payload: SubscriptionPayload<Message>, variables, context) => {
        if (variables.chatId) {
          return (
            payload.content.createdById !== context.userId &&
            payload.content.chatId == variables.chatId
          );
        }
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload<Message>) => payload.content,
});

export const MessageCreatedSubscription = subscriptionField('messageCreated', {
  type: 'Message',
  description: 'SUbscribe to created messages in chat',
  args: {
    chatId: hashIdArg(),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageCreated),
      (payload: SubscriptionPayload<Message>, variables, context) => {
        if (variables.chatId) {
          return (
            payload.content.createdById !== context.userId &&
            payload.content.chatId == variables.chatId
          );
        }
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload<Message>) => payload.content,
});

export const MessageDeletedSubscription = subscriptionField('messageDeleted', {
  type: 'DeletedMessage',
  description: 'Subscribe to deleted messages in chat',
  args: {
    chatId: hashIdArg(),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageDeleted),
      (payload: SubscriptionPayload<Message>, variables, context) => {
        if (variables.chatId) {
          return (
            payload.content.createdById !== context.userId &&
            payload.content.chatId == variables.chatId
          );
        }
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload<Message>) => payload.content,
});

export const MessageUpdatedSubscription = subscriptionField('messageUpdated', {
  type: 'MessageResult',
  description: 'Subscribe to updated messages in chat',
  args: {
    chatId: hashIdArg(),
  },
  authorize: (_, { chatId }, { auth }) =>
    chatId ? auth.canViewChat(chatId) : true,
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageUpdated),
      (payload: SubscriptionPayload<Message>, variables, context) => {
        if (variables.chatId) {
          return (
            payload.content.createdById !== context.userId &&
            payload.content.chatId == variables.chatId
          );
        }
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload<Message>) => payload.content,
});
