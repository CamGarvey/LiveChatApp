import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';
import SubscriptionPayload from '../../backing-types/subscription-payload';
import { IContext } from '../../context.interface';

export const FriendSubscription = subscriptionField('friends', {
  type: 'User',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('friend.*', { pattern: true }),
      (payload: SubscriptionPayload, _, context: IContext) => {
        return payload.recipients.includes(context.userId);
      }
    )(rootValue, args, context);
  },
  resolve: (payload: SubscriptionPayload) => payload.content,
});
