import { interfaceType } from 'nexus';

export const Alert = interfaceType({
  name: 'Alert',
  resolveType: async (parent, { prisma }) => {
    const alert = await prisma.alert.findFirstOrThrow({
      where: {
        notificationId: parent.id ?? undefined,
      },
      select: {
        type: true,
      },
    });
    return alert.type;
  },
  definition: (t) => {
    t.implements('Notification');
    t.nonNull.list.nonNull.field('recipients', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.notification
          .findUniqueOrThrow({
            where: {
              id: parent.id,
            },
          })
          .recipients();
      },
    });
  },
});
