import { interfaceType } from 'nexus';

export const MessageInterface = interfaceType({
  name: 'MessageInterface',
  resolveType: (t) => {
    return t.deletedAt == null ? 'Message' : 'DeletedMessage';
  },
  definition: (t) => {
    t.nonNull.id('messageId');
    t.nonNull.string('createdById');
    t.nonNull.field('createdBy', {
      type: 'UserResult',
      resolve: async (parent, __, { prisma }) => {
        return await prisma.user.findUnique({
          where: {
            userId: parent.createdById || undefined,
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
    t.nonNull.string('chatId');
    t.nonNull.field('chat', {
      type: 'ChatResult',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findUnique({
          where: {
            chatId: parent.chatId || undefined,
          },
        });
      },
    });
  },
});
