import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';

export const NotificationSubscription = subscriptionField('notifications', {
  type: 'Notification',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('notification.*', { pattern: true }),
      (payload, variables) => {
        console.log('sub', { payload, variables });

        return payload.chatId === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
