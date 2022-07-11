import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from '../../../backing-types';

export const chatDeletedSubscription = subscriptionField('chatDeleted', {
  type: 'DeletedChat',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatDeleted),
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
