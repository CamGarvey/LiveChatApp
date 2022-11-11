import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Event, Member, Prisma } from '@prisma/client';
import { objectType } from 'nexus';

export const DirectMessageChat = objectType({
  name: 'DirectMessageChat',
  description: 'A direct message chat is a conversation between 2 members',
  definition: (t) => {
    t.implements('Chat');
    t.nonNull.field('friend', {
      type: 'User',
      description: 'Other user involved in direct message conversation',
      resolve: async (parent, __, { currentUserId, prisma }) => {
        return await prisma.member
          .findFirstOrThrow({
            where: {
              chatId: parent.id,
              AND: [
                {
                  chatId: parent.id,
                },
                {
                  userId: {
                    not: currentUserId,
                  },
                },
              ],
            },
          })
          .user();
      },
    });
    t.nonNull.connectionField('events', {
      type: 'Event',
      description: 'Events in chat',
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
  description: `
    A group chat can involve two or more members, can have a name, a description and members can be given roles.`,
  definition: (t) => {
    t.implements('Chat');
    t.nonNull.string('name', {
      description: 'Group chat name',
    });
    t.string('description', {
      description: 'Group chat description',
    });
    t.nonNull.int('memberCount', {
      description: 'Number of members in the chat',
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
      description: 'Your role in the chat',
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
      description: 'Members in chat',
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
      description: 'Events in chat',
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
  description: 'A chat that has been deleted',
  definition: (t) => {
    t.implements('Chat');
    t.nonNull.date('deletedAt');
  },
});
