import { list, nonNull, queryField } from 'nexus';

export const RequestsQuery = queryField('requests', {
  type: nonNull(list(nonNull('Request'))),
  args: {
    state: 'RequestState',
  },
  resolve: async (_, { state }, { prisma, userId }) => {
    return await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .requests({
        where: {
          state: state ?? undefined,
        },
      });
  },
});
