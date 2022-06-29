import { withFilter } from 'graphql-subscriptions';
import { nonNull, stringArg, subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types/subscriptions.enum';

export const FriendRequestCreatedSubscription = subscriptionField(
  'friendRequestCreated',
  {
    type: 'User',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscription.FriendRequestCreated),
      (payload, _, context) => {
        return payload.userId === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload.friend;
    },
  }
);

export const FriendCreatedSubscription = subscriptionField('friendCreated', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
  },
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(Subscription.FriendCreated),
    (payload, _, context) => {
      return payload.receiverId === context.userId;
    }
  ),
  resolve(payload: any) {
    return payload.friend;
  },
});
