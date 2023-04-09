import { list, nonNull, queryField } from 'nexus';

export const Notifications = queryField('notifications', {
  type: nonNull(list(nonNull('Notification'))),
  description: 'Get all notifications for current user',
  resolve: async (_, __, { prisma, currentUserId }) => {
    const user = await prisma.user.findUniqueOrThrow({
      include: {
        requests: {
          where: {
            state: 'SENT',
          },
        },
        alerts: true,
      },
      where: {
        id: currentUserId,
      },
    });
    return [...user.requests, ...user.alerts];
  },
});
