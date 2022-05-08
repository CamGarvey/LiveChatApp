import { Prisma } from '@prisma/client';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import {
  arg,
  extendType,
  inputObjectType,
  intArg,
  nonNull,
  stringArg,
} from 'nexus';
import { Sort } from '../types/enums';
import User from '../types/user';

const UserOrderBy = inputObjectType({
  name: 'UserOrderBy',
  definition(t) {
    t.field('username', {
      type: Sort,
    });
    t.field('id', {
      type: Sort,
    });
    t.field('name', {
      type: Sort,
    });
    t.field('email', {
      type: Sort,
    });
    t.field('username', {
      type: Sort,
    });
    t.field('createdAt', {
      type: Sort,
    });
    t.field('updatedAt', {
      type: Sort,
    });
  },
});

// get ALl Users
export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.connectionField('Users', {
      type: User,
      additionalArgs: {
        nameFilter: stringArg({
          description: 'If set, filters users by given filter',
        }),
        orderBy: arg({ type: UserOrderBy, description: 'How to order query' }),
      },
      resolve: async (_, { after, first, nameFilter, orderBy }, { prisma }) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const whereNameIs = Prisma.validator<Prisma.UserWhereInput>()({
          name: {
            contains: nameFilter,
          },
        });

        const [totalCount, items] = await Promise.all([
          prisma.user.count({
            where: whereNameIs,
          }),
          prisma.user.findMany({
            take: first,
            skip: offset,
            where: whereNameIs,
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

// get ALl Users
export const UserIsFriendsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.connectionField('Users', {
      type: User,
      additionalArgs: {
        nameFilter: stringArg({
          description: 'If set, filters users by given filter',
        }),
        orderBy: arg({ type: UserOrderBy, description: 'How to order query' }),
      },
      resolve: async (_, { after, first, nameFilter, orderBy }, { prisma }) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const whereNameIs = Prisma.validator<Prisma.UserWhereInput>()({
          name: {
            contains: nameFilter,
          },
        });

        const [totalCount, items] = await Promise.all([
          prisma.user.count({
            where: whereNameIs,
          }),
          prisma.user.findMany({
            take: first,
            skip: offset,
            where: whereNameIs,
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

export const FriendsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('Friends', {
      type: User,
      args: {
        userId: nonNull(
          intArg({
            description: 'Id of User',
          })
        ),
      },
      resolve: (_, { userId }, ctx) => {
        return ctx.prisma.user
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

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('User', {
      type: User,
      args: {
        id: nonNull(
          intArg({
            description: 'id of user',
          })
        ),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.user.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
