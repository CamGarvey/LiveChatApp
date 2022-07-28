import { interfaceType } from 'nexus';

export const Notification = interfaceType({
  name: 'Notification',
  resolveType: (source: any) =>
    'chatId' in source ? 'ChatInvite' : 'FriendRequest',
  definition: (t) => {
    t.nonNull.hashId('id');
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
    t.nonNull.date('createdAt');
  },
});
