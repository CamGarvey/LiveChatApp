import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { NotificationPayload } from '../../../backing-types';

export const AlertSubscription = subscriptionField('alerts', {
  type: 'Alert',
  description: 'Subscribe to alerts',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('notification.alert.*', {
          pattern: true,
        }),
      (payload: NotificationPayload) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: NotificationPayload) {
    return payload.content;
  },
});
