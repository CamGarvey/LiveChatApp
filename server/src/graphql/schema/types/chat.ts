import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { objectType } from 'nexus';

export const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.implements('IChat');
    t.nonNull.connectionField('messages', {
      type: 'MessageResult',
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
