import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { objectType } from 'nexus';
import { DateScalar } from './scalars';

export const Channel = objectType({
  name: 'Channel',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.nonNull.field('updatedAt', {
      type: DateScalar,
    });
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        const channel = await prisma.channel.findUnique({
          where: {
            id: parent.id,
          },
          include: {
            createdBy: true,
          },
        });
        return channel.createdBy;
      },
    });
    t.nonNull.connectionField('messages', {
      type: 'Message',
      resolve: async (parent, args, { prisma }) => {
        return await findManyCursorConnection(
          (args) =>
            prisma.message.findMany({
              ...args,
              ...{ where: { channelId: parent.id } },
            }),
          () =>
            prisma.message.count({
              ...{ where: { channelId: parent.id } },
            }),
          args
        );
      },
    });
    t.nonNull.boolean('isDM');
    t.nonNull.int('memberCount', {
      resolve: async (parent, _, { prisma }) => {
        const members = await prisma.channel
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .members();
        return members.length;
      },
    });
    t.nonNull.list.nonNull.field('members', {
      type: 'User',
      resolve: (parent, _, { prisma }) => {
        return prisma.channel
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .members();
      },
    });
  },
});
