import { Request as PrismaRequest } from '@prisma/client';
import { interfaceType } from 'nexus';

export const Request = interfaceType({
  name: 'Request',
  description:
    'Request is a type of notification that requires a response and is sent to a single user',
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
    t.nonNull.field('state', {
      type: 'RequestState',
    });
  },
});
