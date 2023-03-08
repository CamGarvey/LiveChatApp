import { Chat } from '@prisma/client';
import { interfaceType } from 'nexus';

export const ChatInterface = interfaceType({
  name: 'Chat',
  description: 'Chat interface',
  resolveType: (chat: Chat) =>
    chat.deletedAt
      ? 'DeletedChat'
      : chat.type === 'DIRECT_MESSAGE'
      ? 'DirectMessageChat'
      : 'GroupChat',
  definition: (t) => {
    t.nonNull.hashId('id', {
      description: 'Id of chat',
    });
    t.nonNull.hashId('createdById', {
      description: 'Id of user that created the chat',
    });
    t.nonNull.field('createdBy', {
      type: 'User',
      description: 'User that created the chat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: parent.createdById,
          },
        });
      },
    });
    t.nonNull.boolean('isCreator', {
      description: 'Are you the creator?',
      resolve: (parent, _, { currentUserId }) => {
        return parent.createdById == currentUserId;
      },
    });
    t.date('createdAt', {
      description: 'Time of creation',
    });
    t.date('updatedAt', {
      description: 'Time of last update',
    });
  },
});
