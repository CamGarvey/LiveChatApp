import { ForbiddenError } from 'apollo-server-core';
import { withFilter } from 'graphql-subscriptions';
import { nonNull, stringArg, subscriptionField } from 'nexus';
import { Subscription } from '../../backing-types/subscriptions.enum';

export const messageCreatedSubscription = subscriptionField('messageCreated', {
  type: 'Message',
  args: {
    channelId: nonNull(stringArg()),
  },
  subscribe: async (rootValue, args, context) => {
    const members = await context.prisma.channel
      .findUnique({
        where: {
          id: args.channelId,
        },
      })
      .members();

    if (!members.find((member) => member.id == context.userId)) {
      throw new ForbiddenError(
        'You do not have permission to subscribe to events in this channel'
      );
    }

    return withFilter(
      () => context.pubsub.asyncIterator(Subscription.MessageCreated),
      (payload, variables) => {
        return payload.channelId === variables.channelId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
