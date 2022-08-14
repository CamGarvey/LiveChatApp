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
            status: status || undefined,
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
    t.field('friendRequest', {
      type: 'FriendRequest',
      resolve: async (parent, _, { prisma, userId }) => {
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: userId,
          },
          include: {
            sentFriendRequests: {
              where: {
                status: {
                  in: ['SEEN', 'SENT'],
                },
              },
            },
            receivedFriendRequests: {
              where: {
                status: {
                  in: ['SEEN', 'SENT'],
                },
              },
            },
          },
        });

        const sentRequest = user.sentFriendRequests.find(
          (x) => x.recipientId == parent.id
        );
        if (sentRequest) {
          return sentRequest;
        }

        const receivedRequest = user.receivedFriendRequests.find(
          (x) => x.createdById == parent.id
        );
        if (receivedRequest) {
          return receivedRequest;
        }
        return null;
      },
    });
  },
});
