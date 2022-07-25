import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types';

type Chat = {
  members: {
    id: string;
  }[];
};

export const ChatsSubscription = subscriptionField('chats', {
  type: 'Chat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('chat.*', { pattern: true }),
      (payload: Chat, _, context) => {
        return payload.members.map(({ id }) => id).includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});

export const ChatCreatedSubscription = subscriptionField('chatCreated', {
  type: 'Chat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatCreated),
      (payload: Chat, _, context) => {
        return payload.members.map(({ id }) => id).includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});

export const ChatUpdatedSubscription = subscriptionField('chatUpdated', {
  type: 'Chat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatUpdated),
      (payload: Chat, _, context) => {
        return payload.members.map(({ id }) => id).includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});

export const ChatDeletedSubscription = subscriptionField('chatDeleted', {
  type: 'DeletedChat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatDeleted),
      (payload: Chat, _, context) => {
        return payload.members.map(({ id }) => id).includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
