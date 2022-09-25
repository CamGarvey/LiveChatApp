import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { ChatPayload, Subscription } from '../../backing-types';

export const ChatsSubscription = subscriptionField('chats', {
  type: 'ChatSubscriptionResult',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('chat.*', { pattern: true }),
      (payload: ChatPayload) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: ChatPayload) {
    return payload.content;
  },
});

export const ChatCreatedSubscription = subscriptionField('chatCreated', {
  type: 'Chat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatCreated),
      (payload: ChatPayload) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: ChatPayload) {
    return payload.content;
  },
});

export const ChatDeletedSubscription = subscriptionField('chatDeleted', {
  type: 'DeletedChat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatDeleted),
      (payload: ChatPayload) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: ChatPayload) {
    return payload.content;
  },
});
