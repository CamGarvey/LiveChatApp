import { withFilter } from 'graphql-subscriptions';
import { subscriptionField, unionType } from 'nexus';
import { Subscription } from '../../backing-types/subscriptions.enum';

export const ChatPayload = unionType({
  name: 'ChatPayload',
  definition: (t) => {
    t.members('ChatUpdate', 'Chat', 'DeletedChat');
  },
});

export const chatsSubscription = subscriptionField('chats', {
  type: 'ChatPayload',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('chat.*', { pattern: true }),
      (payload, _, context) => {
        return payload.members
          .map((x: { id: string }) => x.id)
          .includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});

export const chatUpdatedSubscription = subscriptionField('chatUpdated', {
  type: 'ChatUpdate',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatUpdated),
      (payload, _) => {
        console.log(payload);
        return true;
        // return payload.chat.members
        //   .map((x: { id: string }) => x.id)
        //   .includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});

export const chatCreatedSubscription = subscriptionField('chatCreated', {
  type: 'Chat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatCreated),
      (payload, _, context) => {
        return payload.members
          .map((x: { id: string }) => x.id)
          .includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});

export const chatDeletedSubscription = subscriptionField('chatDeleted', {
  type: 'DeletedChat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatDeleted),
      (payload, _, context) => {
        return payload.members
          .map((x: { id: string }) => x.id)
          .includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
