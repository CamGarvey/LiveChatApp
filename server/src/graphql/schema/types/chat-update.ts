import { objectType } from 'nexus';
import { DateScalar } from './scalars';

export const ChatUpdate = objectType({
  name: 'ChatUpdate',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('chat', {
      type: 'Chat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findUnique({
          where: {
            id: parent.chatId,
          },
        });
      },
    });
    t.nonNull.id('chatId');
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.field('createdBy', {
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
