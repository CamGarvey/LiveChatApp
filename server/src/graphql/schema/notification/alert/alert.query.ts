import { arg, list, nonNull, queryField } from 'nexus';

export const AlertsQuery = queryField('alerts', {
  type: nonNull(list(nonNull('Alert'))),
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .alerts();
  },
});
