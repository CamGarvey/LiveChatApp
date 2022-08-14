import { objectType } from 'nexus';

export const ChatInvite = objectType({
  name: 'ChatInvite',
  definition: (t) => {
    t.implements('Request', 'Notification');
    t.nonNull.hashId('chatId');
    t.field('chat', {
      type: 'Chat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findUniqueOrThrow({
          where: {
            id: parent.chatId || undefined,
          },
        });
      },
    });
  },
});
