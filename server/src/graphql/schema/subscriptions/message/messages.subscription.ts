import { ForbiddenError } from 'apollo-server-core';
import { withFilter } from 'graphql-subscriptions';
import { nonNull, stringArg, subscriptionField } from 'nexus';

export const messagesSubscription = subscriptionField('messages', {
  type: 'Message',
  description: 'Subscribe to any created/updated/deleted messages',
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
      () => context.pubsub.asyncIterator('message.*', { pattern: true }),
      (payload, variables) => {
        return payload.chatId === variables.chatId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
