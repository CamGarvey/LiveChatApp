import { list, nonNull, queryField, queryType } from 'nexus';

export const RequestQuery = queryField('pendingRequests', {
  type: nonNull(list(nonNull('Request'))),
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.request.findMany({
      where: {
        recipientId: userId,
        status: 'PENDING',
        deletedAt: null,
      },
    });
  },
});

export const FriendRequests = queryField('friendRequests', {
  type: nonNull(list(nonNull('FriendRequest'))),
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.request.findMany({
      where: {
        recipientId: userId,
        status: 'PENDING',
        deletedAt: null,
      },
    });
  },
});
