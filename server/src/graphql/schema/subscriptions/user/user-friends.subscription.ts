import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';

export const FriendsSubscription = subscriptionField('userFriends', {
  type: 'Me',
  description: `Subscribe to any changes to
       the friendships of the current user (incl requests)`,
  subscribe: withFilter(
    (_, __, { pubsub }) =>
      pubsub.asyncIterator('user.friend.*', { pattern: true }),
    (payload, _, context) => {
      return payload.id === context.userId;
    }
  ),
  resolve(payload: any) {
    return payload;
  },
});
