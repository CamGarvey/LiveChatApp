import { objectType } from 'nexus';
import { DateScalar } from './scalars';

const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('content');
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.nonNull.string('createdById');
    t.nonNull.boolean('isCreator', {
      resolve: (parent, _, { userId }) => {
        return parent.createdById === userId;
      },
    });
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: (parent, _, { prisma }) => {
        return prisma.user.findUnique({
          where: {
            id: parent.createdById,
          },
        });
      },
    });
    t.nonNull.list.nonNull.field('likedBy', {
      type: 'User',
      resolve: (parent, _, { prisma }) => {
        return prisma.message
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .likedBy();
      },
    });
    t.nonNull.field('updatedAt', {
      type: DateScalar,
    });
    t.nonNull.field('chat', {
      type: 'Chat',
      resolve: (parent, _, { prisma }) => {
        return prisma.chat.findUnique({
          where: {
            id: parent.chatId || undefined,
          },
        });
      },
    });
    t.nonNull.id('chatId');
  },
});

export default Message;
