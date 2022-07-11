import { interfaceType } from 'nexus';

export const IUser = interfaceType({
  name: 'IUser',
  resolveType: () => 'Friend',
  definition: (t) => {
    t.nonNull.id('id');
    t.string('name');
    t.nonNull.string('username');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
    t.nonNull.field('friendStatus', {
      type: 'FriendStatus',
      resolve: async (parent, _, { prisma, userId }) => {
        const friends = await prisma.user
          .findUnique({
            where: { id: userId },
          })
          .friends();

        const receivedFriendRequests = await prisma.user
          .findUnique({
            where: { id: userId },
          })
          .receivedFriendRequests();

        const sentFriendRequests = await prisma.user
          .findUnique({
            where: { id: userId },
          })
          .sentFriendRequests();

        if (friends.find((x: any) => x.id == parent.id)) {
          return 'FRIEND';
        }

        if (receivedFriendRequests.find((x: any) => x.id == parent.id)) {
          return 'REQUEST_RECEIVED';
        }

        if (sentFriendRequests.find((x: any) => x.id == parent.id)) {
          return 'REQUEST_SENT';
        }

        return 'NOT_FRIEND';
      },
    });
  },
});
