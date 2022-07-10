import { objectType } from 'nexus';
import { DateScalar } from './scalars';

export const IUser = objectType({
  name: 'IUser',
  definition: (t) => {
    t.nonNull.id('id');
    t.string('name');
    t.nonNull.string('username');
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.nonNull.field('updatedAt', {
      type: DateScalar,
    });
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

        if (friends.find((x) => x.id == parent.id)) {
          return 'FRIEND';
        }

        if (receivedFriendRequests.find((x) => x.id == parent.id)) {
          return 'REQUEST_RECEIVED';
        }

        if (sentFriendRequests.find((x) => x.id == parent.id)) {
          return 'REQUEST_SENT';
        }

        return 'NOT_FRIEND';
      },
    });
  },
});
