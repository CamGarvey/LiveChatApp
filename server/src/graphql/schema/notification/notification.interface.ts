import { Alert, Request } from '@prisma/client';
import { interfaceType } from 'nexus';

export const Notification = interfaceType({
  name: 'Notification',
  resolveType: (source: Alert | Request) => {
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
