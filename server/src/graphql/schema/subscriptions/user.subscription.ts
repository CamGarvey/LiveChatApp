import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types/subscriptions.enum';

export const UserSubscription = subscriptionField('user', {
  type: 'User',
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

export const UserChatsSubscription = subscriptionField('userChats', {
  type: 'User',
  description: 'Subscribe to any changes to current user',
  subscribe: withFilter(
    (_, __, { pubsub }) => pubsub.asyncIterator('user.chat.created'),
    (payload, _, context) => {
      return payload.id === context.userId;
    }
  ),
  resolve(payload: any) {
    return payload;
  },
});

export const FriendsSubscription = subscriptionField('userFriends', {
  type: 'User',
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

export const UserFriendCreatedSubscription = subscriptionField(
  'userFriendCreated',
  {
    type: 'User',
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

export const UserFriendDeletedSubscription = subscriptionField(
  'userFriendDeleted',
  {
    type: 'User',
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

export const FriendRequestChangedSubscription = subscriptionField(
  'userFriendRequests',
  {
    type: 'User',
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

export const UserFriendRequestCreatedSubscription = subscriptionField(
  'userFriendRequestCreated',
  {
    type: 'User',
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

export const UserFriendRequestDeletedSubscription = subscriptionField(
  'userFriendRequestDeleted',
  {
    type: 'User',
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
