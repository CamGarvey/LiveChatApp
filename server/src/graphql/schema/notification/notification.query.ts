import { list, nonNull, queryField } from 'nexus';

export const NotificationQuery = queryField('notifications', {
  type: nonNull(list(nonNull('Notification'))),
  resolve: async (_, __, { prisma, userId }) => {
    prisma.notification.findMany({
      where: {
        recipients: {
          every: {
            id: userId,
          },
        },
      },
    });
    return await prisma.user
      .findUniqueOrThrow({
        where: {
          id: userId,
        },
      })
      .notifications();
  },
});
