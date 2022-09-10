import { NotificationType } from '@prisma/client';
import { interfaceType } from 'nexus';

export const NotificationInterface = interfaceType({
  name: 'Notification',
  resolveType: (source: { type: NotificationType }) => source.type,
  definition: (t) => {
    t.nonNull.hashId('id');
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: parent.createdById,
          },
        });
      },
    });
    t.nonNull.boolean('isCreator', {
      resolve: async (parent, _, { userId }) => parent.createdById == userId,
    });
    t.nonNull.hashId('createdById');
    t.nonNull.date('createdAt');
  },
});
