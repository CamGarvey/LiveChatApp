import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { interfaceType } from 'nexus';

export const UserInterface = interfaceType({
  name: 'User',
  resolveType: async (source: any, { currentUserId, prisma }) => {
    if (source.id == currentUserId) {
      // is current user
      return 'Me';
    }
    // Get current user friends
    const friends = await prisma.user
      .findUniqueOrThrow({
        where: {
          id: currentUserId,
        },
      })
      .friends();
    return friends.map((x) => x.id).includes(source.id) ? 'Friend' : 'Stranger';
  },
  definition: (t) => {
    t.nonNull.hashId('id');
    t.string('name');
    t.nonNull.string('username');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
  },
});

export const KnownUserInterface = interfaceType({
  name: 'KnownUser',
  resolveType: (source, { currentUserId }) => {
    return currentUserId == source.id ? 'Me' : 'Friend';
  },
  definition: (t) => {
    t.nonNull.list.nonNull.field('chats', {
      type: 'Chat',
      resolve: async (parent, _, { prisma, currentUserId }) => {
        if (parent.id == currentUserId) {
          // Is current user, return all
          return await prisma.user
            .findUnique({
              where: { id: parent.id || undefined },
            })
            .memberOfChats();
        }

        return await prisma.chat.findMany({
          where: {
            OR: [
              {
                members: {
                  every: {
                    id: currentUserId,
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
