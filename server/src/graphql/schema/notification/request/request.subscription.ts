import { Request } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { NotificationPayload } from '../../../backing-types';

export const RequestSubscription = subscriptionField('requests', {
  type: 'Request',
  description: 'Subscribe to requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('notification.request.*', {
          pattern: true,
        }),
      (payload: NotificationPayload) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: NotificationPayload) {
    return payload.content as Request;
  },
});
