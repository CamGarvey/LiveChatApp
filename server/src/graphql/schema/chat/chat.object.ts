import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { User } from '@prisma/client';
import { objectType } from 'nexus';

export const DirectMessageChat = objectType({
  name: 'DirectMessageChat',
  description: 'A Direct Message Chat is a conversation between 2 members',
  definition: (t) => {
    t.implements('ChatInterface');
    t.field('createdBy', {
      type: 'KnownUserInterface',
    });
    t.nonNull.field('friend', {
      type: 'Friend',
      resolve: async (parent, __, { userId, prisma }) => {
        const members: User[] = await prisma.chat
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .members();

        // There can only be 2 members in a Direct Message Chat so just grab other user
        return members.find((x) => x.id !== userId);
      },
    });
    t.nonNull.connectionField('messages', {
      type: 'MessageResult',
      resolve: async (parent, args, { prisma }) => {
        return await findManyCursorConnection(
          (args) =>
            prisma.message.findMany({
              ...args,
              ...{ where: { id: parent.id || undefined } },
            }),
          () =>
            prisma.message.count({
              ...{ where: { id: parent.id || undefined } },
            }),
          args
        );
      },
    });
  },
});

export const GroupChat = objectType({
  name: 'GroupChat',
  description: 'A Group Chat is a chat that contains more than 2 members',
  definition: (t) => {
    t.implements('ChatInterface');
    t.nonNull.string('name');
    t.string('description');
    t.field('createdBy', {
      type: 'UserResult',
    });
    t.nonNull.int('memberCount', {
      resolve: async (parent, _, { prisma }) => {
        const members = await prisma.chat
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .members();
        return members.length;
      },
    });
    t.nonNull.list.nonNull.field('members', {
      type: 'UserResult',
      resolve: (parent, _, { prisma }) => {
        return prisma.chat
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .members();
      },
    });
    // t.nonNull.list.nonNull.field('updates', {
    //   type: 'IChat',
    //   resolve: async (parent, _, { prisma }) => {
    //     return await prisma.chat
    //       .findUnique({
    //         where: { id: parent.id || undefined },
    //       })
    //       .updates();
    //   },
    // });
  },
});

export const DeletedChat = objectType({
  name: 'DeletedChat',
  definition: (t) => {
    t.implements('ChatInterface');
    t.nonNull.date('deletedAt');
    t.field('createdBy', {
      type: 'UserResult',
    });
  },
});
