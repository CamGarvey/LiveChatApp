import { Alert as PrismaAlert } from '@prisma/client';
import { interfaceType } from 'nexus';

export const Alert = interfaceType({
  name: 'Alert',
  description: `Alert is a type of notification that does not require a response
    and can be sent to multiple users`,
  resolveType: (source: PrismaAlert) => {
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

export const RequestResponseAlert = interfaceType({
  name: 'RequestResponseAlert',
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
    t.nonNull.hashId('requestId');
    t.nonNull.field('request', {
      type: 'Request',
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
