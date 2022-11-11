import { Alert as PrismaAlert } from '@prisma/client';
import { interfaceType } from 'nexus';

export const Alert = interfaceType({
  name: 'Alert',
  description: `Alert is a type of notification that does not require a response
    and can be sent to multiple users`,
  resolveType: (source: PrismaAlert) => {
    switch (source.type) {
      case 'CHAT_DELETED':
        return 'ChatDeletedAlert';
      case 'FRIEND_DELETED':
        return 'FriendDeletedAlert';
      case 'REQUEST_ACCEPTED':
        return 'RequestAcceptedAlert';
      case 'REQUEST_DECLINED':
        return 'RequestDeclinedAlert';
      case 'CHAT_ACCESS_REVOKED':
        return 'ChatMemberAccessRevokedAlert';
      case 'CHAT_ACCESS_GRANTED':
        return 'ChatMemberAccessGrantedAlert';
      case 'CHAT_ROLE_CHANGED':
        return 'ChatRoleChanged';
      default:
        return null;
    }
  },
  definition: (t) => {
    t.implements('Notification');
    t.nonNull.list.nonNull.field('recipients', {
      type: 'User',
      description: 'Users that recieved alert',
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

export const RequestResponseAlert = interfaceType({
  name: 'RequestResponseAlert',
  description: 'A response alert for requests',
  resolveType: (source: PrismaAlert) => {
    switch (source.type) {
      case 'REQUEST_ACCEPTED':
        return 'RequestAcceptedAlert';
      case 'REQUEST_DECLINED':
        return 'RequestDeclinedAlert';
      default:
        return null;
    }
  },
  definition: (t) => {
    t.implements('Alert');
    t.nonNull.hashId('requestId', {
      description: 'Id of request associated with alert',
    });
    t.nonNull.field('request', {
      type: 'Request',
      description: 'Request associated with alert',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.request.findUniqueOrThrow({
          where: {
            id: parent.requestId ?? undefined,
          },
        });
      },
    });
  },
});

export const ChatAccessAlert = interfaceType({
  name: 'ChatAccessAlert',
  description: 'An alert about chat access changes',
  resolveType: (source: PrismaAlert) => {
    switch (source.type) {
      case 'CHAT_ACCESS_REVOKED':
        return 'ChatMemberAccessRevokedAlert';
      case 'CHAT_ACCESS_GRANTED':
        return 'ChatMemberAccessGrantedAlert';
      case 'CHAT_ROLE_CHANGED':
        return 'ChatRoledChangedAlert';
      default:
        return null;
    }
  },
  definition: (t) => {
    t.implements('Alert');
    t.nonNull.hashId('chatId', {
      description: 'Id of chat associated with alert',
    });
    t.nonNull.field('chat', {
      type: 'Chat',
      description: 'Chat associated with alert',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findUniqueOrThrow({
          where: {
            id: parent.chatId ?? undefined,
          },
        });
      },
    });
  },
});
