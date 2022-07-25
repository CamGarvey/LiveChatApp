import { list, nonNull, queryField } from 'nexus';

export const NotificationQuery = queryField('notifications', {
  type: nonNull(list(nonNull('Notification'))),
  resolve: async (_, __, { prisma, userId }) => {
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        receivedChatInvites: true,
        receivedFriendRequests: true,
      },
    });

    return [...result.receivedChatInvites, ...result.receivedFriendRequests];
  },
});
