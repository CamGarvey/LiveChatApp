import { objectType } from 'nexus';

export const NewFriendAlert = objectType({
  name: 'NewFriend',
  definition: (t) => {
    t.implements('Alert');
    t.nonNull.field('user', {
      type: 'Friend',
      resolve: async (parent, _, { prisma }) => {
        const alert = await prisma.notification.findUniqueOrThrow({
          where: {
            id: parent.id ?? undefined,
          },
          include: {
            createdBy: true,
          },
        });
        return alert.createdBy;
      },
    });
  },
});

export const FriendDeletedAlert = objectType({
  name: 'FriendDeletedAlert',
  definition: (t) => {
    t.implements('Alert');
    t.nonNull.field('user', {
      type: 'Stranger',
      resolve: async (parent, _, { prisma }) => {
        const alert = await prisma.notification.findUniqueOrThrow({
          where: {
            id: parent.id ?? undefined,
          },
          include: {
            createdBy: true,
          },
        });
        return alert.createdBy;
      },
    });
  },
});

export const ChatCreatedAlert = objectType({
  name: 'ChatCreatedAlert',
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

export const ChatDeletedAlert = objectType({
  name: 'ChatDeletedAlert',
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
