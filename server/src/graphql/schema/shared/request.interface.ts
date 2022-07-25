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
    });
    t.nonNull.hashId('recipientId');
    t.nonNull.field('status', {
      type: 'RequestStatus',
    });
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUnique({
          where: {
            id: parent.createdById,
          },
        });
      },
    });
    t.nonNull.hashId('createdById');
  },
});
