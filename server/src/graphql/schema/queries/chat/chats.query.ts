import { extendType } from 'nexus';

export const chats = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('chats', {
      type: 'ChatResult',
      resolve: async (_, __, { prisma, userId }) => {
        return await prisma.user
          .findUnique({
            where: {
              id: userId,
            },
          })
          .memberOfChats();
      },
    });
  },
});
