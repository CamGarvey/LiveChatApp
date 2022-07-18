import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { interfaceType } from 'nexus';

export const UserInterface = interfaceType({
  name: 'User',
  resolveType: (source, { userId }) => {
    return source.id == userId ? 'Me' : 'Friend';
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
  resolveType: (source, { userId }) => {
    return userId == source.id ? 'Me' : 'Friend';
  },
  definition: (t) => {
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

        return await prisma.chat.findMany({
          where: {
            OR: [
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
