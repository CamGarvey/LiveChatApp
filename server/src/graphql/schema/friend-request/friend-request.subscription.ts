import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';

export const FriendRequestSubscription = subscriptionField('friendRequests', {
  type: 'Message',
  description: 'Subscribe to friend requests',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () =>
        context.pubsub.asyncIterator('notification.friendrequest.*', {
          pattern: true,
        }),
      (payload) => {
        return payload.recipientId === context.userId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
