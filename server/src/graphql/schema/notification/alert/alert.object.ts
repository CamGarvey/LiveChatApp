import { objectType } from 'nexus';

export const RequestAcceptedAlert = objectType({
  name: 'RequestAcceptedAlert',
  definition: (t) => {
    t.implements('RequestResponseAlert');
  },
});

export const RequestDeclinedAlert = objectType({
  name: 'RequestDeclinedAlert',
  definition: (t) => {
    t.implements('RequestResponseAlert');
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

export const ChatMemberAccessRevokedAlert = objectType({
  name: 'ChatMemberAccessRevokedAlert',
  definition: (t) => {
    t.implements('ChatAccessAlert');
  },
});

export const ChatMemberAccessGrantedAlert = objectType({
  name: 'ChatMemberAccessGrantedAlert',
  definition: (t) => {
    t.implements('ChatAccessAlert');
  },
});

export const ChatAdminAccessRevokedAlert = objectType({
  name: 'ChatAdminAccessRevokedAlert',
  definition: (t) => {
    t.implements('ChatAccessAlert');
  },
});

export const ChatAdminAccessGrantedAlert = objectType({
  name: 'ChatAdminAccessGrantedAlert',
  definition: (t) => {
    t.implements('ChatAccessAlert');
  },
});
