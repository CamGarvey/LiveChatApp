import { interfaceType } from 'nexus';

export const Request = interfaceType({
  name: 'Request',
  resolveType: async (parent, { prisma }) => {
    const request = await prisma.request.findFirstOrThrow({
      where: {
        notificationId: parent.id ?? undefined,
      },
      select: {
        type: true,
      },
    });
    return request.type;
  },
  definition: (t) => {
    t.implements('Notification');
    t.nonNull.field('status', {
      type: 'RequestStatus',
    });
  },
});
