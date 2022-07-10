import { interfaceType } from 'nexus';
import { DateScalar } from './scalars';

export const IMessage = interfaceType({
  name: 'IMessage',
  resolveType: (t) => {
    return t.deletedAt == null ? 'Message' : 'DeletedMessage';
  },
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('createdById');
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
    t.nonNull.field('deletedAt', {
      type: DateScalar,
    });
    t.nonNull.field('updatedAt', {
      type: DateScalar,
    });
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.nonNull.string('chatId');
    t.nonNull.field('chat', {
      type: 'ChatResult',
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
