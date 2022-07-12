import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types';

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

export const FriendCreatedSubscription = subscriptionField(
  'userFriendCreated',
  {
    type: 'Me',
    description: 'Subscribe to new friends',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscription.UserFriendCreated),
      (payload, _, context) => {
        return payload.id === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload;
    },
  }
);

export const FriendDeletedSubscription = subscriptionField(
  'userFriendDeleted',
  {
    type: 'Me',
    description: 'Subscribe to unfriend events',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator(Subscription.UserFriendDeleted),
      (payload, _, context) => {
        return payload.id === context.userId;
      }
    ),
    resolve(payload: any) {
      return payload;
    },
  }
);

export const RequestChangedSubscription = subscriptionField(
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

export const FriendRequestCreatedSubscription = subscriptionField(
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

export const FriendRequestDeletedSubscription = subscriptionField(
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
