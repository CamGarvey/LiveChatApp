import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { objectType } from 'nexus';
import { DateScalar } from './scalars';

export const Chat = objectType({
  name: 'Chat',
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
        const chat = await prisma.chat.findUnique({
          where: {
            id: parent.id,
          },
          include: {
            createdBy: true,
          },
        });
        return chat.createdBy;
      },
    });
    t.nonNull.connectionField('messages', {
      type: 'Message',
      resolve: async (parent, args, { prisma }) => {
        return await findManyCursorConnection(
          (args) =>
            prisma.message.findMany({
              ...args,
              ...{ where: { chatId: parent.id } },
            }),
          () =>
            prisma.message.count({
              ...{ where: { chatId: parent.id } },
            }),
          args
        );
      },
    });
    t.nonNull.boolean('isDM');
    t.nonNull.int('memberCount', {
      resolve: async (parent, _, { prisma }) => {
        const members = await prisma.chat
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
        return prisma.chat
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .members();
      },
    });
    t.nonNull.list.nonNull.field('updates', {
      type: 'ChatUpdate',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .updates();
      },
    });
  },
});
