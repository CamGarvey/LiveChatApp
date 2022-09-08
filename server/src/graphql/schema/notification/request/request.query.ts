import { list, nonNull, queryField } from 'nexus';

export const FriendRequestsQuery = queryField('friendRequests', {
  type: nonNull(list(nonNull('FriendRequest'))),
  args: {
    status: 'RequestStatus',
  },
  resolve: async (_, { status }, { prisma, userId }) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId ?? undefined,
      },
      include: {
        notifications: {
          where: {
            request: {
              AND: [
                {
                  type: 'FriendRequest',
                },
                {
                  status: status ?? undefined,
                },
              ],
            },
          },
        },
      },
    });
    return user.notifications;
  },
});
