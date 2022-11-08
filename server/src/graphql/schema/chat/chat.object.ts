import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Event, Member, Prisma } from '@prisma/client';
import { objectType } from 'nexus';

export const DirectMessageChat = objectType({
  name: 'DirectMessageChat',
  description: 'A Direct Message Chat is a conversation between 2 members',
  definition: (t) => {
    t.implements('Chat');
    t.nonNull.field('friend', {
      type: 'Member',
      resolve: async (parent, __, { currentUserId, prisma }) => {
        const members: Member[] = await prisma.chat
          .findUniqueOrThrow({
            where: { id: parent.id || undefined },
          })
          .members({
            where: {
              userId: {
                not: currentUserId,
              },
            },
          });

        // There can only be 2 members in a Direct Message Chat so just grab other user
        return members[0];
      },
    });
    t.nonNull.connectionField('events', {
      type: 'Event',
      resolve: async (parent, args, { prisma }) => {
        return await findManyCursorConnection<
          Event,
          Pick<Prisma.EventWhereUniqueInput, 'id'>
        >(
          (args) =>
            prisma.event.findMany({
              ...args,
              ...{ where: { id: parent.id || undefined } },
            }),
          () =>
            prisma.event.count({
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
        const chat = await prisma.chat.findUniqueOrThrow({
          where: { id: parent.id || undefined },
          select: {
            _count: {
              select: {
                members: true,
              },
            },
          },
        });
        return chat._count.members;
      },
    });
    t.nonNull.field('role', {
      type: 'Role',
      resolve: async ({ id }, _, { prisma, currentUserId }) => {
        const { role } = await prisma.member.findUniqueOrThrow({
          select: {
            role: true,
          },
          where: {
            userId_chatId: {
              chatId: id,
              userId: currentUserId,
            },
          },
        });
        return role;
      },
    });
    t.nonNull.connectionField('members', {
      type: 'Member',
      resolve: async (parent, args, { prisma }) => {
        return await findManyCursorConnection<
          Member,
          Pick<Prisma.MemberWhereUniqueInput, 'id'>
        >(
          (args) =>
            prisma.chat
              .findUniqueOrThrow({
                ...{ where: { id: parent.id || undefined } },
              })
              .members({
                ...args,
              }),
          () =>
            prisma.chat
              .findUniqueOrThrow({
                ...{ where: { id: parent.id || undefined } },
                select: {
                  _count: {
                    select: {
                      members: true,
                    },
                  },
                },
              })
              .then((x) => x._count.members),
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
    t.nonNull.connectionField('events', {
      type: 'Event',
      resolve: async (parent, args, { prisma }) => {
        return await findManyCursorConnection<
          Event,
          Pick<Prisma.EventWhereUniqueInput, 'id'>
        >(
          (args) =>
            prisma.event.findMany({
              ...args,
              ...{ where: { id: parent.id || undefined } },
            }),
          () =>
            prisma.event.count({
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

export const DeletedChat = objectType({
  name: 'DeletedChat',
  definition: (t) => {
    t.implements('Chat');
    t.nonNull.date('deletedAt');
  },
});
