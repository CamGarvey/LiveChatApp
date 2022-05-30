import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { objectType } from 'nexus';
import Channel from './channel';
import FriendStatus from './friend-status';
import { DateScalar } from './scalars';

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.string('name');
    t.nonNull.string('email');
    t.nonNull.string('username');
    t.nonNull.field('createdAt', {
      type: DateScalar,
    });
    t.nonNull.field('updatedAt', {
      type: DateScalar,
    });
    t.field('friendStatus', {
      type: FriendStatus,
      resolve: async (parent, _, { prisma, userId }) => {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: {
            friends: {
              where: {
                id: parent.id,
              },
            },
            sentFriendRequests: {
              where: {
                id: parent.id,
              },
            },
            receivedFriendRequests: {
              where: {
                id: parent.id,
              },
            },
          },
        });

        if (!user) {
          throw new Error("User doesn't exist");
        }

        if (user.friends.length) {
          return 'FRIEND';
        }

        if (user.receivedFriendRequests.length) {
          return 'REQUEST_RECEIVED';
        }

        if (user.sentFriendRequests.length) {
          return 'REQUEST_SENT';
        }

        return 'NOT_FRIEND';
      },
    });
    t.nonNull.list.nonNull.field('sentFriendRequests', {
      type: User,
      resolve: (parent, _, { prisma }) => {
        return prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .sentFriendRequests();
      },
    });
    t.nonNull.list.nonNull.field('receivedFriendRequests', {
      type: User,
      resolve: (parent, _, { prisma }) => {
        return prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .receivedFriendRequests();
      },
    });
    t.nonNull.list.nonNull.field('channels', {
      type: Channel,
      resolve: async (parent, _, { prisma, userId }) => {
        if (parent.id == userId) {
          // Is current user, return all
          return await prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .memberOfChannels();
        }

        // Only return non private channels
        // or channels that the current user is in
        return await prisma.channel.findMany({
          where: {
            OR: [
              {
                isPrivate: false,
              },
              {
                members: {
                  every: {
                    id: userId,
                  },
                },
              },
            ],
          },
        });
      },
    });
    t.nonNull.connectionField('friends', {
      type: User,
      resolve: async (parent, { after, first }, { prisma }) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const [totalCount, items] = await Promise.all([
          prisma.user.count(),
          prisma.user.findMany({
            take: first ?? undefined,
            skip: offset,
            where: {
              friendsOf: {
                some: {
                  id: parent.id,
                },
              },
            },
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
  },
});

export default User;
