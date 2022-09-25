import { objectType } from 'nexus';

export const RequestAccepted = objectType({
  name: 'RequestAccepted',
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

export const RequestDeclined = objectType({
  name: 'RequestDeclined',
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

export const FriendDeleted = objectType({
  name: 'FriendDeleted',
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

export const ChatCreated = objectType({
  name: 'ChatCreated',
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

export const ChatDeleted = objectType({
  name: 'ChatDeleted',
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
