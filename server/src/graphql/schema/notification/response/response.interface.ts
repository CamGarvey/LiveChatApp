import { interfaceType } from 'nexus';

export const Response = interfaceType({
  name: 'Response',
  resolveType: (source) => {
    // const request = await prisma.request.findUniqueOrThrow({
    //   where: {
    //     notificationId: source.requestId
    //   }
    // });
    return 'FriendRequestResponse';
  },
  definition: (t) => {
    t.implements('Notification');
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
    t.nonNull.field('status', {
      type: 'ResponseStatus',
    });
  },
});
