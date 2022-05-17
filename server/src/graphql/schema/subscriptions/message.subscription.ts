import { ForbiddenError } from 'apollo-server-core';
import { withFilter } from 'graphql-subscriptions';
import { intArg, nonNull, objectType, subscriptionField } from 'nexus';
import Message from '../types/message';
import { Subscriptions } from '../types/subscriptions';

const newMessagePayload = objectType({
  name: 'NewMessagePayload',
  definition(t) {
    t.nonNull.int('channelId');
    t.nonNull.field('message', {
      type: Message,
    });
  },
});

export const newMessageSubscription = subscriptionField('newMessage', {
  type: newMessagePayload,
  args: {
    channelId: nonNull(intArg()),
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
        'You do not have permission to subscribe to this channel'
      );
    }

    return withFilter(
      () => context.pubsub.asyncIterator(Subscriptions.NEW_MESSAGE),
      (payload, variables) => {
        return payload.channelId === variables.channelId;
      }
    )(rootValue, args, context);
  },
  resolve(payload: any) {
    return payload;
  },
});
