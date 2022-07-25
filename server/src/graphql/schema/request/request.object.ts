import { objectType } from 'nexus';

export const FriendRequest = objectType({
  name: 'FriendRequest',
  definition: (t) => {
    t.implements('Request');
  },
});

export const ChatRequest = objectType({
  name: 'ChatRequest',
  definition: (t) => {
    t.implements('Request');
    t.nonNull.hashId('chatId');
    t.nonNull.field('chat', {
      type: 'GroupChat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findUnique({
          where: {
            id: parent.id || undefined,
          },
        });
      },
    });
  },
});
