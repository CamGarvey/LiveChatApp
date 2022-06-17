import { withFilter } from 'graphql-subscriptions';
import { nonNull, stringArg, subscriptionField } from 'nexus';
import { Subscriptions } from '../types/subscriptions';
import User from '../types/user';

export const newFriendRequestSubscription = subscriptionField(
  'newFriendRequest',
  {
    type: User,
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscriptions.NEW_FRIEND_REQUEST),
      (payload, _, context) => {
        return payload.userId === context.userId;
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
    userId: nonNull(stringArg()),
  },
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(Subscriptions.NEW_FRIEND),
    (payload, _, context) => {
      return payload.receiverId === context.userId;
    }
  ),
  resolve(payload: any) {
    return payload.friend;
  },
});
