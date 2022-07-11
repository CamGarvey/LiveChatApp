import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from 'src/graphql/backing-types';

export const friendRequestDeletedSubscription = subscriptionField(
  'userFriendRequestDeleted',
  {
    type: 'Me',
    description: 'Subscribe to deleted friend requests',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscription.UserFriendRequestDeleted),
      (payload, _, context) => {
        return payload.id === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload;
    },
  }
);
