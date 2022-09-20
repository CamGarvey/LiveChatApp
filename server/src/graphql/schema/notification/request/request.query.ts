import { list, nonNull, queryField } from 'nexus';

export const RequestsQuery = queryField('requests', {
  type: nonNull(list(nonNull('Request'))),
  args: {
    status: 'RequestStatus',
  },
  resolve: async (_, { status }, { prisma, userId }) => {
    return await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .requests({
        where: {
          status: status ?? undefined,
        },
      });
  },
});
