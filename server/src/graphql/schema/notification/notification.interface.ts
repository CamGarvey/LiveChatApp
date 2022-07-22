import { interfaceType } from 'nexus';

export const NotificationInterface = interfaceType({
  name: 'Notification',
  resolveType: (source: any) => {
    if (source.type == 'FRIEND_REQUEST') {
      return source.deletedAt
        ? 'DeletedFriendRequestNotification'
        : 'OpenFriendRequestNotification';
    }
    if (source.type == 'FRIEND') {
      return 'FriendNotification';
    }
    return null;
  },
  definition: (t) => {
    t.nonNull.hashId('id');
    t.nonNull.list.nonNull.field('recipients', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.notification
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .recipients();
      },
    });
    t.nonNull.hashId('createdById');
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
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
  },
});
