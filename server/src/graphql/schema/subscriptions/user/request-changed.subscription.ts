import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';

export const requestChangedSubscription = subscriptionField(
  'userFriendRequests',
  {
    type: 'Me',
    description:
      'Subscribe to any changes to the friend requests of the current user',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator('user.friend.request.*', { pattern: true }),
      (payload, _, context) => {
        return payload.id === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload;
    },
  }
);
