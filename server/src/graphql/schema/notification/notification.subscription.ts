import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { NotificationPayload } from '../../../graphql/backing-types';

export const NotificationSubscription = subscriptionField('notifications', {
  type: 'Notification',
  description: 'Subscribe to all types of notifications',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('notification.*', {
          pattern: true,
        }),
      (payload: NotificationPayload) => {
        return payload.recipients.includes(context.currentUserId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: NotificationPayload) {
    return payload.content;
  },
});
