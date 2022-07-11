import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';

export const chatsSubscription = subscriptionField('chats', {
  type: 'ChatResult',
  subscribe: async (rootValue, args, context) => {
    return withFilter(
      () => context.pubsub.asyncIterator('chat.*', { pattern: true }),
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
