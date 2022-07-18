import { objectType } from 'nexus';

export const Friend = objectType({
  name: 'Friend',
  definition: (t) => {
    t.implements('User', 'KnownUser');
  },
});

export const Me = objectType({
  name: 'Me',
  definition: (t) => {
    t.implements('User', 'KnownUser');
    t.nonNull.list.nonNull.field('receivedFriendRequests', {
      type: 'Stranger',
      resolve: (parent, _, { prisma }) => {
        return prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .receivedFriendRequests();
      },
    });
  },
});

export const Stranger = objectType({
  name: 'Stranger',
  definition: (t) => {
    t.implements('User');
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
