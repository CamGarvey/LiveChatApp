import { Alert as PrismaAlert } from '@prisma/client';
import { interfaceType } from 'nexus';

export const Alert = interfaceType({
  name: 'Alert',
  resolveType: (source: PrismaAlert) => {
    switch (source.type) {
      case 'CHAT_CREATED':
        return 'ChatCreatedAlert';
      case 'CHAT_DELETED':
        return 'ChatDeletedAlert';
      case 'FRIEND_CREATED':
        return 'NewFriendAlert';
      case 'FRIEND_DELETED':
        return 'FriendDeletedAlert';
      case 'FRIEND_REQUEST_RESPONSE':
        return 'FriendRequestResponse';
      default:
        return null;
    }
  },
  definition: (t) => {
    t.implements('Notification');
    t.nonNull.list.nonNull.field('recipients', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.alert
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
