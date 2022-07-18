import { interfaceType } from 'nexus';

export const MessageInterface = interfaceType({
  name: 'MessageInterface',
  resolveType: (t) => {
    return t.deletedAt == null ? 'Message' : 'DeletedMessage';
  },
  definition: (t) => {
    t.nonNull.hashId('id');
    t.nonNull.hashId('createdById');
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async (parent, __, { prisma }) => {
        return await prisma.user.findUnique({
          where: {
            id: parent.createdById || undefined,
          },
        });
      },
    });
    t.nonNull.boolean('isCreator', {
      resolve: (parent, _, { userId }) => {
        return parent.createdById === userId;
      },
    });
    t.date('deletedAt');
    t.nonNull.date('updatedAt');
    t.nonNull.date('createdAt');
    t.nonNull.hashId('chatId');
    t.nonNull.field('chat', {
      type: 'Chat',
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
