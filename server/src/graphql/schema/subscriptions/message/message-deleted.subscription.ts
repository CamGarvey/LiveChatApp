import { ForbiddenError } from 'apollo-server-core';
import { withFilter } from 'graphql-subscriptions';
import { subscriptionField, nonNull, stringArg } from 'nexus';
import { Subscription } from 'src/graphql/backing-types';

export const messageDeletedSubscription = subscriptionField('messageDeleted', {
  type: 'Message',
  args: {
    chatId: nonNull(stringArg()),
  },
  subscribe: async (rootValue, args, context) => {
    const members = await context.prisma.chat
      .findUnique({
        where: {
          id: args.chatId,
        },
      })
      .members();

    if (!members.find((member) => member.id == context.userId)) {
      throw new ForbiddenError(
        'You do not have permission to subscribe to events in this chat'
      );
    }

    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageDeleted),
      (payload, variables) => {
        return payload.chatId === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
