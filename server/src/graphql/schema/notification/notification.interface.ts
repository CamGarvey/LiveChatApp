import { Alert, Request } from '@prisma/client';
import { interfaceType } from 'nexus';

export const Notification = interfaceType({
  name: 'Notification',
  resolveType: (source: Alert | Request) => {
    switch (source.type) {
      case 'CHAT_CREATED':
        return 'ChatCreatedAlert';
      case 'CHAT_DELETED':
        return 'ChatDeletedAlert';
      case 'FRIEND_DELETED':
        return 'FriendDeletedAlert';
      case 'REQUEST_ACCEPTED':
        return 'RequestAcceptedAlert';
      case 'REQUEST_DECLINED':
        return 'RequestDeclinedAlert';
      case 'FRIEND_REQUEST':
        return 'FriendRequest';
      case 'CHAT_ACCESS_REVOKED':
        return 'ChatMemberAccessRevokedAlert';
      case 'CHAT_ACCESS_GRANTED':
        return 'ChatMemberAccessGrantedAlert';
      case 'CHAT_ROLE_CHANGED':
        return 'ChatRoleChangedAlert';
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
      resolve: async (parent, _, { currentUserId }) =>
        parent.createdById == currentUserId,
    });
    t.nonNull.hashId('createdById');
    t.nonNull.date('createdAt');
  },
});
