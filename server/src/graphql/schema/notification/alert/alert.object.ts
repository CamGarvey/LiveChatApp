import { objectType } from 'nexus';

export const RequestAcceptedAlert = objectType({
  name: 'RequestAcceptedAlert',
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

export const RequestDeclinedAlert = objectType({
  name: 'RequestDeclinedAlert',
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

export const FriendDeletedAlert = objectType({
  name: 'FriendDeletedAlert',
  definition: (t) => {
    t.implements('Alert');
    t.nonNull.field('user', {
      type: 'Stranger',
      resolve: async (parent, _, { prisma }) => {
        const alert = await prisma.alert.findUniqueOrThrow({
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
        const chat = await prisma.alert
          .findUniqueOrThrow({
            where: {
              id: parent.id ?? undefined,
            },
          })
          .chat();

        if (!chat) {
          throw new Error('Failed to find chat');
        }
        return chat;
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
        const chat = await prisma.alert
          .findUniqueOrThrow({
            where: {
              id: parent.id ?? undefined,
            },
          })
          .chat();

        if (!chat) {
          throw new Error('Failed to find chat');
        }
        return chat;
      },
    });
  },
});