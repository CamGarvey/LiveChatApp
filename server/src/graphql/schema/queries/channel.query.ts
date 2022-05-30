import { ForbiddenError } from 'apollo-server-core';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { extendType, intArg, nonNull } from 'nexus';
import Channel from '../types/channel';
import Message from '../types/message';

export const channelMessages = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.connectionField('channelMessages', {
      type: Message,
      additionalArgs: {
        channelId: nonNull(
          intArg({
            description: 'If set, filters users by given filter',
          })
        ),
      },
      resolve: async (
        _,
        { channelId, after, first, before, last },
        { prisma, userId }
      ) => {
        const members = await prisma.channel
          .findUnique({
            where: {
              id: channelId,
            },
          })
          .members();

        if (!members.find((member) => member.id == userId)) {
          throw new ForbiddenError(
            'You do not have permission to this channel'
          );
        }

        const offset =
          after || before ? cursorToOffset(after || before) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const [totalCount, items] = await Promise.all([
          prisma.message.count({
            where: {
              channelId,
            },
          }),
          prisma.message.findMany({
            take: first || last,
            skip: offset,
            where: {
              channelId,
            },
            orderBy: {
              createdAt: first ? 'asc' : 'desc',
            },
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
  },
});

export const channels = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('channels', {
      type: Channel,
      resolve: async (_, __, { prisma, userId }) => {
        return await prisma.user
          .findUnique({
            where: {
              id: userId,
            },
          })
          .memberOfChannels();
      },
    });
  },
});

export const channel = extendType({
  type: 'Query',
  definition(t) {
    t.field('channel', {
      type: Channel,
      args: {
        channelId: nonNull(
          intArg({
            description: 'Id of channel',
          })
        ),
      },
      resolve: async (_, { channelId }, { prisma, userId }) => {
        const channel = await prisma.channel.findUnique({
          where: {
            id: channelId,
          },
          include: {
            members: {
              where: {
                id: userId,
              },
            },
          },
        });

        if (!channel?.members.length) {
          throw new ForbiddenError(
            'You do not have permission to this channel'
          );
        }
        return channel;
      },
    });
  },
});
