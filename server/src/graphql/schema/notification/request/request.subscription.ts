import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { RequestPayload, Subscription } from '../../../backing-types';

export const RequestSubscription = subscriptionField('requests', {
  type: 'Request',
  description: 'Subscribe to requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('notification.request.*', {
          pattern: true,
        }),
      (payload: RequestPayload) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: RequestPayload) {
    return payload.request;
  },
});

export const RequestSentSubscription = subscriptionField('requestSent', {
  type: 'Request',
  description: 'Subscribe to sent requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator(Subscription.RequestSent, {
          pattern: true,
        }),
      (payload: RequestPayload) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: RequestPayload) {
    return payload.request;
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
          context.pubsub.asyncIterator(Subscription.RequestCancelled, {
            pattern: true,
          }),
        (payload: RequestPayload) => {
          return payload.recipients.includes(context.userId);
        }
      )(rootValue, args, context);
    },
    resolve(payload: RequestPayload) {
      return payload.request;
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
          context.pubsub.asyncIterator(Subscription.RequestAccepted, {
            pattern: true,
          }),
        (payload: RequestPayload) => {
          return payload.recipients.includes(context.userId);
        }
      )(rootValue, args, context);
    },
    resolve(payload: RequestPayload) {
      return payload.request;
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
          context.pubsub.asyncIterator(Subscription.RequestDeclined, {
            pattern: true,
          }),
        (payload: RequestPayload) => {
          return payload.recipients.includes(context.userId);
        }
      )(rootValue, args, context);
    },
    resolve(payload: RequestPayload) {
      return payload.request;
    },
  }
);
