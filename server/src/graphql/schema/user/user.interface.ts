import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { interfaceType } from 'nexus';

export const UserInterface = interfaceType({
  name: 'UserInterface',
  resolveType: (source, { prisma }) => 'Stranger',
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
  resolveType: (source) => 'Friend',
  definition: (t) => {
    t.nonNull.list.nonNull.field('receivedFriendRequests', {
      type: 'UserResult',
      resolve: (parent, _, { prisma }) => {
        return prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .receivedFriendRequests();
      },
    });
    t.nonNull.list.nonNull.field('chats', {
      type: 'ChatResult',
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
