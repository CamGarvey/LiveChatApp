import { Alert, Request } from '@prisma/client';
import { interfaceType } from 'nexus';

export const NotificationInterface = interfaceType({
  name: 'Notification',
  resolveType: (source: Request | Alert) => {
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
      case 'FRIEND_REQUEST':
        return 'FriendRequest';
      default:
        return null;
    }
  },
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
