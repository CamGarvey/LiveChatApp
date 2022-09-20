import { Request as PrismaRequest } from '@prisma/client';
import { interfaceType } from 'nexus';

export const Request = interfaceType({
  name: 'Request',
  resolveType: (source: PrismaRequest) => {
    switch (source.type) {
      case 'FRIEND_REQUEST':
        return 'FriendRequest';
      default:
        return null;
    }
  },
  definition: (t) => {
    t.implements('Notification');
    t.nonNull.field('recipient', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: parent.recipientId,
          },
        });
      },
    });
    t.nonNull.hashId('recipientId');
    t.nonNull.field('status', {
      type: 'RequestStatus',
    });
    t.field('response', {
      type: 'Response',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.response.findUnique({
          where: {
            requestId: parent.id,
          },
        });
      },
    });
  },
});
