import { Prisma } from '@prisma/client';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { arg, extendType, nonNull, queryField, stringArg } from 'nexus';

// get All Users
export const users = extendType({
  type: 'Query',
  definition(t) {
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
  },
});

export const friendsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('friends', {
      type: 'User',
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
  },
});

export const userQuery = queryField('user', {
  type: 'User',
  args: {
    id: nonNull(
      stringArg({
        description: 'id of user',
      })
    ),
  },
  resolve: async (_, { id }, ctx) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  },
});

export const meQuery = queryField('me', {
  type: 'User',
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
});
