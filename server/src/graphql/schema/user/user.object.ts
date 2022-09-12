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
    t.nonNull.field('status', {
      type: 'StrangerStatus',
      resolve: async (parent, _, { prisma, userId }) => {
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: userId,
          },
          select: {
            notifications: {
              where: {
                type: 'REQUEST',
                request: {
                  is: {
                    type: 'FRIEND_REQUEST',
                    notification: {
                      createdById: parent.id,
                    },
                    responses: {
                      none: {
                        notification: {
                          createdById: userId,
                        },
                      },
                    },
                  },
                },
              },
            },
            notificationsSent: {
              where: {
                type: 'REQUEST',
                request: {
                  is: {
                    type: 'FRIEND_REQUEST',
                    notification: {
                      recipients: {
                        every: {
                          id: parent.id,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

        if (user.notifications.map((x) => x.createdById).includes(parent.id)) {
          return 'REQUEST_RECEIVED';
        }

        if (
          user.notificationsSent.map((x) => x.recipientId).includes(parent.id)
        ) {
          return 'REQUEST_SENT';
        }

        return 'NO_REQUEST';
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
            notifications: {
              where: {
                type: 'REQUEST',
                request: {
                  is: {
                    type: 'FRIEND_REQUEST',
                    responses: {
                      none: {
                        notification: {
                          createdById: userId,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });

        const receivedRequest = user.notifications[0];
        if (receivedRequest) {
          return receivedRequest;
        }
        return null;
      },
    });
  },
});
