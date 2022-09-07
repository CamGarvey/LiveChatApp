import { list, nonNull, queryField } from 'nexus';

export const FriendRequestsQuery = queryField('friendRequests', {
  type: nonNull(list(nonNull('FriendRequest'))),
  args: {
    status: 'RequestStatus',
  },
  resolve: async (_, { status }, { prisma, userId }) => {
    return await prisma.request.findMany({
      where: {
        recipientId: userId,
        status: status ?? undefined,
        type: 'FriendRequest',
      },
    });
  },
});
