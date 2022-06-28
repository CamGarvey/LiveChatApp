import { ForbiddenError } from 'apollo-server-core';
import { withFilter } from 'graphql-subscriptions';
import { nonNull, objectType, stringArg, subscriptionField } from 'nexus';
import { Subscriptions } from '../../backing-types/subscriptions';

const NewChannelEventPayload = objectType({
  name: 'NewChannelEventPayload',
  definition(t) {
    t.nonNull.string('channelId');
    t.nonNull.field('event', {
      type: 'ChannelEvent',
    });
  },
});

export const channelEventSubscription = subscriptionField(
  'channelEventSubscription',
  {
    type: NewChannelEventPayload,
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
          'You do not have permission to subscribe to this channel '
        );
      }

      return withFilter(
        () => context.pubsub.asyncIterator(Subscriptions.CHANNEL_EVENT),
        (payload, variables) => {
          return payload.channelId === variables.channelId;
        }
      )(rootValue, args, context);
    },
    resolve(payload: any) {
      return payload;
    },
  }
);
