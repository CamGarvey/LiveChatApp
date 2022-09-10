import { objectType } from 'nexus';

export const NewFriendAlert = objectType({
  name: 'NewFriendAlert',
  definition: (t) => {
    t.implements('Alert');
  },
});

export const GroupChatCreated = objectType({
  name: 'GroupChatCreated',
  definition: (t) => {
    t.implements('Alert');
    t.nonNull.field('chat', {
      type: 'Chat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.alert
          .findUniqueOrThrow({
            where: {
              notificationId: parent.id ?? undefined,
            },
          })
          .chat();
      },
    });
  },
});
