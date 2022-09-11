import { Notification } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import SubscriptionPayload from '../../../backing-types/subscription-payload';

export const RequestSubscription = subscriptionField('requests', {
  type: 'Request',
  description: 'Subscribe to requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('*.request.notification', {
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

export const RequestSentSubscription = subscriptionField('requestSent', {
  type: 'Request',
  description: 'Subscribe to sent requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('sent.*.request.notification', {
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

export const RequestCancelledSubscription = subscriptionField(
  'requestCancelled',
  {
    type: 'Request',
    description: 'Subscribe to cancelled requests',
    subscribe: async (rootValue, args, context) => {
      return withFilter(
        () =>
          context.pubsub.asyncIterator('cancelled.*.request.notification', {
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
  }
);

export const RequestAcceptedSubscription = subscriptionField(
  'requestAccepted',
  {
    type: 'Request',
    description: 'Subscribe to accepted requests',
    subscribe: async (rootValue, args, context) => {
      return withFilter(
        () =>
          context.pubsub.asyncIterator('accepted.*.request.notification', {
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
  }
);

export const RequestDeclinedSubscription = subscriptionField(
  'requestDeclined',
  {
    type: 'Request',
    description: 'Subscribe to declined requests',
    subscribe: async (rootValue, args, context) => {
      return withFilter(
        () =>
          context.pubsub.asyncIterator('declined.*.request.notification', {
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
  }
);

export const FriendRequestSubscription = subscriptionField('friendRequests', {
  type: 'FriendRequest',
  description: 'Subscribe to friend requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('*.friend.request.notification', {
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
