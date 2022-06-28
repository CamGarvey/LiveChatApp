import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ForbiddenError } from 'apollo-server-core';
import { extendType, nonNull, stringArg } from 'nexus';

export const channelMessages = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.connectionField('channelMessages', {
      type: 'Message',
      additionalArgs: {
        channelId: nonNull(
          stringArg({
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
        return findManyCursorConnection(
          (args) => {
            return prisma.message.findMany({
              ...args,
              ...{
                where: { channelId },
                orderBy: {
                  createdAt: 'asc',
                },
              },
            });
          },

          () =>
            prisma.message.count({
              where: {
                channelId,
              },
            }),
          { after, first, before, last }
        );
      },
    });
  },
});

export const channels = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('channels', {
      type: 'Channel',
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
      type: 'Channel',
      args: {
        channelId: nonNull(
          stringArg({
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
