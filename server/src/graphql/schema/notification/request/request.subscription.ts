import { Notification } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import SubscriptionPayload from '../../../backing-types/subscription-payload';

export const RequestSubscription = subscriptionField('requests', {
  type: 'FriendRequest',
  description: 'Subscribe to friend requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('notification.request.*', {
          pattern: true,
        }),
      (payload: SubscriptionPayload<Notification>) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload<Notification>) {
    return payload.content;
  },
});

export const FriendRequestSubscription = subscriptionField('friendRequests', {
  type: 'FriendRequest',
  description: 'Subscribe to friend requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('notification.request.friend.*', {
          pattern: true,
        }),
      (payload: SubscriptionPayload<Notification>) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload<Notification>) {
    return payload.content;
  },
});
