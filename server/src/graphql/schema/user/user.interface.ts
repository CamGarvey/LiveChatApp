import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { interfaceType } from 'nexus';

export const UserInterface = interfaceType({
  name: 'UserInterface',
  resolveType: async (source) => {
    return 'Friend';
  },
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

export const KnownUserInterface = interfaceType({
  name: 'KnownUserInterface',
  resolveType: (source, { userId }) => {
    return userId == source.userId ? 'Me' : 'Friend';
  },
  definition: (t) => {
    t.nonNull.list.nonNull.field('receivedFriendRequests', {
      type: 'UserResult',
      resolve: (parent, _, { prisma }) => {
        return prisma.user
          .findUnique({
            where: { userId: parent.userId || undefined },
          })
          .receivedFriendRequests();
      },
    });
    t.nonNull.list.nonNull.field('chats', {
      type: 'ChatResult',
      resolve: async (parent, _, { prisma, userId }) => {
        if (parent.userId == userId) {
          // Is current user, return all
          return await prisma.user
            .findUnique({
              where: { userId: parent.userId || undefined },
            })
            .memberOfChats();
        }

        return await prisma.chat.findMany({
          where: {
            OR: [
              {
                members: {
                  every: {
                    userId,
                  },
                },
              },
            ],
          },
        });
      },
    });
    t.nonNull.connectionField('friends', {
      type: 'Friend',
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
                  userId: parent.userId,
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
