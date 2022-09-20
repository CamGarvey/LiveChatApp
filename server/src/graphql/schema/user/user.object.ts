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
    t.nonNull.list.nonNull.field('sentRequests', {
      type: 'Request',
      args: {
        status: 'RequestStatus',
      },
      resolve: async (_, { status }, { prisma, userId }) => {
        return await prisma.user
          .findUniqueOrThrow({
            where: {
              id: userId,
            },
          })
          .requestsSent({
            where: {
              status: status ?? undefined,
            },
          });
      },
    });
    t.nonNull.list.nonNull.field('requests', {
      type: 'Request',
      args: {
        status: 'RequestStatus',
      },
      resolve: async (_, { status }, { prisma, userId }) => {
        return await prisma.user
          .findUniqueOrThrow({
            where: {
              id: userId,
            },
          })
          .requests({
            where: {
              status: status ?? undefined,
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
    t.nonNull.field('status', {
      type: 'StrangerStatus',
      resolve: async (parent, _, { prisma, userId }) => {
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: userId,
          },
          select: {
            requests: {
              where: {
                type: 'FRIEND_REQUEST',
                OR: [
                  {
                    response: null,
                  },
                  {
                    response: {
                      is: {
                        status: {
                          equals: 'SEEN',
                        },
                      },
                    },
                  },
                ],
              },
            },
            requestsSent: {
              where: {
                type: 'FRIEND_REQUEST',
                OR: [
                  {
                    response: null,
                  },
                  {
                    response: {
                      is: {
                        status: {
                          equals: 'SEEN',
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        });

        if (user.requests.find((x) => x.createdById === parent.id)) {
          return 'REQUEST_RECEIVED';
        }

        if (user.requestsSent.find((x) => x.recipientId === parent.id)) {
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
          select: {
            requests: {
              where: {
                type: 'FRIEND_REQUEST',
                OR: [
                  {
                    response: null,
                  },
                  {
                    response: {
                      is: {
                        status: {
                          equals: 'SEEN',
                        },
                      },
                    },
                  },
                ],
              },
            },
            requestsSent: {
              where: {
                type: 'FRIEND_REQUEST',
                OR: [
                  {
                    response: null,
                  },
                  {
                    response: {
                      is: {
                        status: {
                          equals: 'SEEN',
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        });
        let request = user.requests.find((x) => x.createdById === parent.id);
        if (request) {
          return request;
        }

        request = user.requestsSent.find((x) => x.recipientId === parent.id);
        if (request) {
          return request;
        }

        return null;
      },
    });
  },
});
