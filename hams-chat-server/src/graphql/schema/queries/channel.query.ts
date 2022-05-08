import { extendType, intArg, nonNull } from 'nexus';
import Channel from '../types/channel';

export const ChannelsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Channels', {
      type: Channel,
      args: {
        userId: nonNull(
          intArg({
            description: 'Channels user is a member of',
          })
        ),
      },
      resolve: (_, { userId }, ctx) => {
        return ctx.prisma.channel.findMany({
          where: {
            members: {
              some: {
                id: userId,
              },
            },
          },
        });
      },
    });
  },
});

export const ChannelQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('Channel', {
      type: Channel,
      args: {
        id: nonNull(
          intArg({
            description: 'id of channel',
          })
        ),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.channel.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
