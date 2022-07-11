import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import { Subscription } from 'src/graphql/backing-types';

export const chatUpdatedSubscription = subscriptionField('chatUpdated', {
  type: 'ChatUpdate',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.ChatUpdated),
      (payload, _) => {
        console.log(payload);
        return true;
        // return payload.chat.members
        //   .map((x: { id: string }) => x.id)
        //   .includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
