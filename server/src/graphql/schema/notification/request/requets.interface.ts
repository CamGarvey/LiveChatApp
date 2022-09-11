import { interfaceType } from 'nexus';

export const Request = interfaceType({
  name: 'Request',
  resolveType: (source) => 'FriendRequest',
  definition: (t) => {
    t.implements('Notification');
    t.nonNull.list.nonNull.field('recipients', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.notification
          .findUniqueOrThrow({
            where: {
              id: parent.id,
            },
          })
          .recipients();
      },
    });
    t.nonNull.list.nonNull.field('responses', {
      type: 'Response',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.request
          .findUniqueOrThrow({
            where: {
              notificationId: parent.id,
            },
          })
          .responses();
      },
    });
  },
});
