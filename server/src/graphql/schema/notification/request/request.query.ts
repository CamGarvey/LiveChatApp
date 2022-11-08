import { list, nonNull, queryField } from 'nexus';

export const RequestsQuery = queryField('requests', {
  type: nonNull(list(nonNull('Request'))),
  args: {
    state: 'RequestState',
  },
  resolve: async (_, { state }, { prisma, currentUserId }) => {
    return await prisma.user
      .findUnique({
        where: {
          id: currentUserId,
        },
      })
      .requests({
        where: {
          state: state ?? undefined,
        },
      });
  },
});
