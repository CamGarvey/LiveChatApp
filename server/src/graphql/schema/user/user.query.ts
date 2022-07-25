import { Prisma } from '@prisma/client';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { arg, list, nonNull, queryField, stringArg } from 'nexus';
import { hashIdArg } from '../shared';

export const MeQuery = queryField('me', {
  type: 'Me',
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
});

export const FriendsQuery = queryField('friends', {
  type: nonNull(list(nonNull('Friend'))),
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .friends();
  },
});

export const UserQuery = queryField('user', {
  type: 'User',
  args: {
    userId: nonNull(
      hashIdArg({
        description: 'id of user',
      })
    ),
  },
  resolve: async (_, { userId }, { prisma }) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
});

export const UsersQuery = queryField((t) => {
  t.nonNull.connectionField('users', {
    type: 'User',
    description: 'Find users',
    additionalArgs: {
      usernameFilter: stringArg({
        description: 'If set, filters users by given filter',
      }),
      orderBy: arg({
        type: 'UserOrderBy',
        description: 'How to order query',
      }),
    },
    resolve: async (
      _,
      { after, first, usernameFilter, orderBy },
      { prisma, userId }
    ) => {
      const offset = after ? cursorToOffset(after) + 1 : 0;
      if (isNaN(offset)) throw new Error('cursor is invalid');

      const where = Prisma.validator<Prisma.UserWhereInput>()({
        AND: [
          {
            id: {
              not: userId, // Dont include self
            },
            OR: [
              {
                username: {
                  contains: usernameFilter,
                  mode: 'insensitive',
                },
              },
              {
                name: {
                  contains: usernameFilter,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
      });

      const [totalCount, items] = await Promise.all([
        prisma.user.count({
          where,
        }),
        prisma.user.findMany({
          take: first,
          skip: offset,
          where,
          orderBy: orderBy,
        }),
      ]);

      return connectionFromArraySlice(
        items,
        { first, after },
        { sliceStart: offset, arrayLength: totalCount }
      );
    },
  });
});
