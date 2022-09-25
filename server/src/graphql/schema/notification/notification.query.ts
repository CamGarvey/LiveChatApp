import { queryField } from 'nexus';

export const Notifications = queryField('notifications', {
  type: 'Notification',
  resolve: async (_, __, { prisma, userId }) => {
    const user = await prisma.user.findUniqueOrThrow({
      include: {
        requests: true,
        alerts: true,
      },
      where: {
        id: userId,
      },
    });
    return [...user.requests, ...user.alerts];
  },
});
