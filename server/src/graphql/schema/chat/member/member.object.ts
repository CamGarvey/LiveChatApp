import { objectType } from 'nexus';

export const Member = objectType({
  name: 'Member',
  definition: (t) => {
    t.nonNull.hashId('userId');
    t.nonNull.field('user', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findFirstOrThrow({
          where: {
            id: parent.userId ?? undefined,
          },
        });
      },
    });
    t.nonNull.hashId('chatId');
    t.nonNull.field('chat', {
      type: 'Chat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findFirstOrThrow({
          where: {
            id: parent.chatId ?? undefined,
          },
        });
      },
    });
    t.nonNull.field('role', {
      type: 'Role',
    });
  },
});
