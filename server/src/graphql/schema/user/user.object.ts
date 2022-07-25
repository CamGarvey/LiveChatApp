import { Prisma } from '@prisma/client';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
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
    t.nonNull.list.nonNull.field('friendRequests', {
      type: 'FriendRequest',
      args: {
        status: 'RequestStatus',
      },
      resolve: async (parent, { status }, { prisma }) => {
        return await prisma.friendRequest.findMany({
          where: {
            recipientId: parent.id,
            status,
          },
          include: {
            recipient: true,
          },
        });
      },
    });
  },
});

export const Stranger = objectType({
  name: 'Stranger',
  definition: (t) => {
    t.implements('User');
    t.nonNull.connectionField('mutualFriends', {
      type: 'Friend',
      resolve: async (parent, { after, first }, { prisma, userId }) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        // Find all users where friends with both
        const where: Prisma.UserWhereInput = {
          AND: [
            {
              friends: {
                some: {
                  id: parent.id,
                },
              },
            },
            {
              friends: {
                some: {
                  id: userId,
                },
              },
            },
          ],
        };

        const [totalCount, items] = await Promise.all([
          prisma.user.count({
            where,
          }),
          prisma.user.findMany({
            take: first ?? undefined,
            skip: offset,
            where,
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
    t.nonNull.field('friendStatus', {
      type: 'FriendStatus',
      resolve: async (parent, _, { prisma, userId }) => {
        const friends = await prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .friends();

        if (friends.find((x: any) => x.id == userId)) {
          return 'FRIEND';
        }

        const user = await prisma.user.findUnique({
          where: { id: parent.id },
          include: {
            sentFriendRequests: {
              select: {
                id: true,
              },
              where: {
                status: {
                  in: ['SEEN', 'SENT'],
                },
              },
            },
            receivedFriendRequests: {
              select: {
                id: true,
              },
              where: {
                status: {
                  in: ['SEEN', 'SENT'],
                },
              },
            },
          },
        });

        if (user.receivedFriendRequests.find((x: any) => x.id == userId)) {
          return 'REQUEST_SENT';
        }

        if (user.sentFriendRequests.find((x: any) => x.id == userId)) {
          return 'REQUEST_RECEIVED';
        }

        return 'NOT_FRIEND';
      },
    });
  },
});
