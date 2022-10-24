import { list, nonNull, queryField } from 'nexus';

export const Notifications = queryField('notifications', {
  type: nonNull(list(nonNull('Notification'))),
  description: 'Get all notifications for current user',
  resolve: async (_, __, { prisma, userId }) => {
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
        id: userId,
      },
    });
    return [...user.requests, ...user.alerts];
  },
});
