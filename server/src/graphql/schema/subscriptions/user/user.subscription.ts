import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';

export const UserSubscription = subscriptionField('user', {
  type: 'Me',
  description: 'Subscribe to any changes to current user',
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator('user.*', { pattern: true }),
    (payload, _, context) => {
      return payload.id === context.userId;
    }
  ),
  resolve(payload: any) {
    return payload;
  },
});
