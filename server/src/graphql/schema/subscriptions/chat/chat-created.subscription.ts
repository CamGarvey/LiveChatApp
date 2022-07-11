import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../../backing-types';

export const chatCreatedSubscription = subscriptionField('chatCreated', {
  type: 'Chat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatCreated),
      (payload, _, context) => {
        return payload.members
          .map((x: { id: string }) => x.id)
          .includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
