import { objectType } from 'nexus';

export const RequestResponse = objectType({
  name: 'RequestResponse',
  definition: (t) => {
    t.nonNull.hashId('requestId');
    t.nonNull.field('request', {
      type: 'Request',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.request.findUniqueOrThrow({
          where: {
            notificationId: parent.requestId,
          },
        });
      },
    });
    t.nonNull.hashId('userId');
    t.nonNull.field('user', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: parent.userId,
          },
        });
      },
    });
    t.nonNull.field('status', {
      type: 'RequestStatus',
    });
  },
});
