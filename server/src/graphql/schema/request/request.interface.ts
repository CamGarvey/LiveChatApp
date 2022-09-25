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
