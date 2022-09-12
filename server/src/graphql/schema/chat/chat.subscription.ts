import { Chat, Event } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription, SubscriptionPayload } from '../../backing-types';

export const ChatsSubscription = subscriptionField('chats', {
  type: 'ChatSubscriptionResult',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('chat.*', { pattern: true }),
      (payload: SubscriptionPayload<Chat>) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload<Chat | Event>) {
    return payload.content;
  },
});

export const ChatCreatedSubscription = subscriptionField('chatCreated', {
  type: 'Chat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatCreated),
      (payload: SubscriptionPayload<Chat>) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload<Chat>) {
    return payload.content;
  },
});

export const ChatUpdatedSubscription = subscriptionField('chatUpdated', {
  type: 'ChatUpdate',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('chat.update.*', { pattern: true }),
      (payload: SubscriptionPayload<Event>) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload<Event>) {
    return payload.content;
  },
});

export const ChatDeletedSubscription = subscriptionField('chatDeleted', {
  type: 'DeletedChat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatDeleted),
      (payload: SubscriptionPayload<Chat>) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload<Event>) {
    return payload.content;
  },
});
