import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types';

export const ChatsSubscription = subscriptionField('chats', {
  type: 'ChatResult',
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

export const ChatCreatedSubscription = subscriptionField('chatCreated', {
  type: 'ChatResult',
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

export const ChatDeletedSubscription = subscriptionField('chatDeleted', {
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

// export const chatUpdatedSubscription = subscriptionField('chatUpdated', {
//   type: 'ChatUpdate',
//   subscribe: async (rootValue, args, context) => {
//     return withFilter(
//       () => context.pubsub.asyncIterator(Subscription.ChatUpdated),
//       (payload, _) => {
//         console.log(payload);
//         return true;
//         // return payload.chat.members
//         //   .map((x: { id: string }) => x.id)
//         //   .includes(context.userId);
//       }
//     )(rootValue, args, context);
//   },
//   resolve(payload: any) {
//     return payload;
//   },
// });