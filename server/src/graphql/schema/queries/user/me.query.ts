import { queryField } from 'nexus';

export const meQuery = queryField('me', {
  type: 'Me',
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },
});
