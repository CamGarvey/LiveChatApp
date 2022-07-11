import { interfaceType } from 'nexus';

export const IMessage = interfaceType({
  name: 'IMessage',
  resolveType: (t) => {
    return t.deletedAt == null ? 'Message' : 'DeletedMessage';
  },
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('createdById');
    t.nonNull.field('createdBy', {
      type: 'IUser',
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
    t.nonNull.string('chatId');
    t.nonNull.field('chat', {
      type: 'IChat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findUnique({
          where: {
            id: parent.chatId || undefined,
          },
        });
      },
    });
  },
});
