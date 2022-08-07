import { FriendRequest } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import SubscriptionPayload from '../../backing-types/subscription-payload';

export const FriendRequestSubscription = subscriptionField('friendRequests', {
  type: 'FriendRequest',
  description: 'Subscribe to friend requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('notification.friendrequest.*', {
          pattern: true,
        }),
      (payload: SubscriptionPayload<FriendRequest>) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: SubscriptionPayload<FriendRequest>) {
    return payload.content;
  },
});
