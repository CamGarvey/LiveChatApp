import { Notification } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { SubscriptionPayload } from '../../../backing-types';

export const AlertSubscription = subscriptionField('alerts', {
  type: 'Alert',
  description: 'Subscribe to alerts',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('*.alert.notification', {
          pattern: true,
        }),
      (payload: SubscriptionPayload<Notification>) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload<Notification>) {
    return payload.content;
  },
});
