import { withFilter } from 'graphql-subscriptions';

import { subscriptionField } from 'nexus';
import SubscriptionPayload from '../../backing-types/subscription-payload';

export const NotificationSubscription = subscriptionField('notifications', {
  type: 'Notification',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('*.notification.*', { pattern: true }),
      (payload: SubscriptionPayload, _, context) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload) {
    return payload.content;
  },
});
