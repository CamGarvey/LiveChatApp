import { withFilter } from 'graphql-subscriptions';
import { nonNull, stringArg, subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types/subscriptions.enum';

export const MeSubscription = subscriptionField('meChanged', {
  type: 'User',
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator(Subscription.MeChanged),
    (payload, _, context) => {
      return payload.id === context.userId;
    }
  ),
  resolve(payload: any) {
    return payload;
  },
});

export const FriendRequestCreatedSubscription = subscriptionField(
  'friendRequestCreated',
  {
    type: 'User',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscription.FriendRequestCreated),
      (payload, _, context) => {
        return payload.receiverId === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload.sender;
    },
  }
);

export const FriendRequestDeletedSubscription = subscriptionField(
  'friendRequestDeleted',
  {
    type: 'User',
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator(Subscription.FriendDeleted),
      (payload, _, context) => {
        return payload.receiverId === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload.sender;
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
