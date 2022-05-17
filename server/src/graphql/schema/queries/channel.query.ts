import { extendType, intArg, nonNull } from 'nexus';
import Channel from '../types/channel';

export const ChannelsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Channels', {
      type: Channel,
      resolve: (_, __, { prisma, userId }) => {
        return prisma.channel.findMany({
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
      resolve: async (_, { id }, { prisma }) => {
        return await prisma.channel.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
