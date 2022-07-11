import { extendType } from 'nexus';

export const friendsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('friends', {
      type: 'Friend',
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
