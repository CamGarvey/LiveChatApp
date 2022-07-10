import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { interfaceType } from 'nexus';

export const IKnownUser = interfaceType({
  name: 'IKnownUser',
  resolveType: (source) => 'Friend',
  definition: (t) => {
    t.nonNull.list.nonNull.field('receivedFriendRequests', {
      type: 'User',
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
      type: 'User',
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
