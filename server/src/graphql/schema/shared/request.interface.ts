import { interfaceType } from 'nexus';

export const Request = interfaceType({
  name: 'Request',
  resolveType: (source: any) => {
    return 'chatId' in source ? 'ChatInvite' : 'FriendRequest';
  },
  definition: (t) => {
    t.nonNull.hashId('id');
    t.field('recipient', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: parent.recipientId,
          },
        });
      },
    });
    t.nonNull.hashId('recipientId');
    t.nonNull.field('status', {
      type: 'RequestStatus',
    });
    t.nonNull.boolean('isCreator', {
      resolve: async (parent, _, { userId }) => parent.createdById == userId,
    });
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
    t.nonNull.hashId('createdById');
    t.nonNull.date('createdAt');
  },
});
