import { Chat } from '@prisma/client';
import { interfaceType } from 'nexus';

export const ChatInterface = interfaceType({
  name: 'Chat',
  resolveType: (chat: Chat) =>
    chat.deletedAt
      ? 'DeletedChat'
      : chat.type === 'DIRECT_MESSAGE'
      ? 'DirectMessageChat'
      : 'GroupChat',
  definition: (t) => {
    t.nonNull.hashId('id');
    t.nonNull.hashId('createdById');
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: parent.createdById,
          },
        });
      },
    });
    t.nonNull.boolean('isCreator', {
      resolve: (parent, _, { userId }) => {
        return parent.createdById == userId;
      },
    });
    t.date('createdAt');
    t.date('updatedAt');
  },
});
