import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../../backing-types';

export const friendRequestCreatedSubscription = subscriptionField(
  'userFriendRequestCreated',
  {
    type: 'Me',
    description: 'Subscribe to new friend requests',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscription.UserFriendRequestReceived),
      (payload, _, context) => {
        return payload.id === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload;
    },
  }
);
