import { list, nonNull, queryField } from 'nexus';

export const AlertsQuery = queryField('alerts', {
  type: nonNull(list(nonNull('Alert'))),
  resolve: async (_, __, { prisma, currentUserId }) => {
    return await prisma.user
      .findUnique({
        where: {
          id: currentUserId,
        },
      })
      .alerts();
  },
});
