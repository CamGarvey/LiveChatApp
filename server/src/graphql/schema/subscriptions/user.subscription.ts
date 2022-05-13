import { withFilter } from 'graphql-subscriptions';
import { intArg, nonNull, subscriptionField } from 'nexus';
import { Subscriptions } from '../types/subscriptions';
import User from '../types/user';

export const newFriendRequestSubscription = subscriptionField(
  'newFriendRequest',
  {
    type: User,
    args: {
      userId: nonNull(intArg()),
    },
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscriptions.NEW_FRIEND_REQUEST),
      (payload, variables) => {
        return payload.userId === variables.userId;
      }
    ),
    resolve(payload: any) {
      return payload.friend;
    },
  }
);

export const newFriendSubscription = subscriptionField('newFriend', {
  type: User,
  args: {
    userId: nonNull(intArg()),
  },
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(Subscriptions.NEW_FRIEND),
    (payload, variables) => {
      return payload.receiverId === variables.userId;
    }
  ),
  resolve(payload: any) {
    return payload.friend;
  },
});
