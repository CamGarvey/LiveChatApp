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
        return payload.recipients.includes(context.currentUserId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: NotificationPayload) {
    return payload.content;
  },
});

export const ChatAccessAlertSubscription = subscriptionField(
  'chatAccessAlerts',
  {
    type: 'ChatAccessAlert',
    description: 'Subscribe to alerts',
    subscribe: async (rootValue, args, context) => {
      return withFilter(
        () =>
          context.pubsub.asyncIterator('notification.alert.chat.access.*', {
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
  }
);
