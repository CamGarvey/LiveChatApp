import { arg, list, nonNull, queryField } from 'nexus';

export const AlertsQuery = queryField('alerts', {
  type: nonNull(list(nonNull('Alert'))),
  args: {
    state: nonNull(
      arg({
        type: 'AlertState',
        default: 'UNSEEN',
      })
    ),
  },
  resolve: async (_, { state }, { prisma, userId }) => {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    switch (state) {
      case 'ALL':
        return await user.alerts();
      case 'UNSEEN':
        return await user.alerts({
          where: {
            seenBy: {
              none: {
                id: userId,
              },
            },
          },
        });
      case 'SEEN':
        return await user.alerts({
          where: {
            seenBy: {
              some: {
                id: userId,
              },
            },
          },
        });

      default:
        return await user.alerts();
    }
  },
});
