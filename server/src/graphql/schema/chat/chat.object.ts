import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Message, Prisma, User } from '@prisma/client';
import { objectType } from 'nexus';

export const DirectMessageChat = objectType({
  name: 'DirectMessageChat',
  description: 'A Direct Message Chat is a conversation between 2 members',
  definition: (t) => {
    t.implements('Chat');
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
      type: 'Message',
      resolve: async (parent, args, { prisma }) => {
        return await findManyCursorConnection<
          Message,
          Pick<Prisma.MessageWhereUniqueInput, 'id'>
        >(
          (args) =>
            prisma.message.findMany({
              ...args,
              ...{ where: { id: parent.id || undefined } },
            }),
          () =>
            prisma.message.count({
              ...{ where: { id: parent.id || undefined } },
            }),
          args,
          {
            getCursor: (record) => ({ id: record.id }),
            encodeCursor: (cursor) =>
              Buffer.from(JSON.stringify(cursor)).toString('base64'),
            decodeCursor: (cursor) =>
              JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
          }
        );
      },
    });
  },
});

export const GroupChat = objectType({
  name: 'GroupChat',
  description: 'A Group Chat is a chat that contains more than 2 members',
  definition: (t) => {
    t.implements('Chat');
    t.nonNull.string('name');
    t.string('description');
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
      type: 'User',
      resolve: (parent, _, { prisma }) => {
        return prisma.chat
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .members();
      },
    });
    t.nonNull.connectionField('messages', {
      type: 'Message',
      resolve: async (parent, args, { prisma }) => {
        return await findManyCursorConnection<
          Message,
          Pick<Prisma.MessageWhereUniqueInput, 'id'>
        >(
          (args) =>
            prisma.message.findMany({
              ...args,
              ...{ where: { id: parent.id || undefined } },
            }),
          () =>
            prisma.message.count({
              ...{ where: { id: parent.id || undefined } },
            }),
          args,
          {
            getCursor: (record) => ({ id: record.id }),
            encodeCursor: (cursor) =>
              Buffer.from(JSON.stringify(cursor)).toString('base64'),
            decodeCursor: (cursor) =>
              JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
          }
        );
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
    t.implements('Chat');
    t.nonNull.date('deletedAt');
  },
});
