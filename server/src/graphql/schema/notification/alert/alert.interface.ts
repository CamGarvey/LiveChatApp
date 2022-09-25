import { Alert as PrismaAlert } from '@prisma/client';
import { interfaceType } from 'nexus';

export const Alert = interfaceType({
  name: 'Alert',
  description:
    'Alert is a type of notification that does not require a response and can be sent to multiple users',
  resolveType: (source: PrismaAlert) => {
    switch (source.type) {
      case 'CHAT_CREATED':
        return 'ChatCreated';
      case 'CHAT_DELETED':
        return 'ChatDeleted';
      case 'FRIEND_DELETED':
        return 'FriendDeleted';
      case 'REQUEST_ACCEPTED':
        return 'RequestAccepted';
      case 'REQUEST_DECLINED':
        return 'RequestDeclined';
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
