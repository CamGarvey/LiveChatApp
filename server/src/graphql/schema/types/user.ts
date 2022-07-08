import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { objectType } from 'nexus';
import { DateScalar } from './scalars';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.string('name');
    t.nonNull.string('email');
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
    t.nonNull.list.nonNull.field('chats', {
      type: 'Chat',
      resolve: async (parent, _, { prisma, userId }) => {
        if (parent.id == userId) {
          // Is current user, return all
          return await prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .memberOfChats();
        }

        // Only return non private chats
        // or chats that the current user is in
        return await prisma.chat.findMany({
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
