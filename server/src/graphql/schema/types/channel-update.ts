import { objectType } from 'nexus';
import { DateScalar } from './scalars';

export const ChannelUpdate = objectType({
  name: 'ChannelUpdate',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('channel', {
      type: 'Channel',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.channel.findUnique({
          where: {
            id: parent.channelId,
          },
        });
      },
    });
    t.nonNull.id('channelId');
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.nonNull.field('createdBy', {
      type: 'User',
    });
    t.nonNull.id('createdById');

    t.string('name');
    t.string('description');
    t.list.nonNull.id('memberIdsAdded');
    t.list.nonNull.id('memberIdsRemoved');
    t.list.nonNull.field('membersAdded', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findMany({
          where: {
            id: {
              in: parent.memberIdsAdded,
            },
          },
        });
      },
    });
    t.list.nonNull.field('membersRemoved', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findMany({
          where: {
            id: {
              in: parent.memberIdsRemoved,
            },
          },
        });
      },
    });
  },
});
