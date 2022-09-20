import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { NotificationPayload, SubscriptionPayload } from '../../backing-types';

export const NotificationSubscription = subscriptionField('notifications', {
  type: 'Notification',
  description:
    'Subscribe to any changes to all alerts, requests, and responses',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('notification.*', { pattern: true }),
      (payload: NotificationPayload, _, context) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload) {
    return payload.content;
  },
});
