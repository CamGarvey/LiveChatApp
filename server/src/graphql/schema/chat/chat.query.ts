import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Prisma, User } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-core';
import { list, nonNull, queryField } from 'nexus';
import { hashIdArg } from '../shared';

export const ChatQuery = queryField('chat', {
  type: 'Chat',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of chat',
      })
    ),
  },
  resolve: async (_, { chatId }, { prisma, userId }) => {
    const chat = await prisma.chat.findUniqueOrThrow({
      where: {
        id: chatId,
      },
      include: {
        members: {
          where: {
            id: userId,
          },
        },
      },
    });

    if (!chat.members.length) {
      throw new ForbiddenError('You do not have permission to this chat');
    }

    return chat;
  },
});

export const ChatsQuery = queryField('chats', {
  type: nonNull(list(nonNull('Chat'))),
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.user
      .findUniqueOrThrow({
        where: {
          id: userId,
        },
      })
      .memberOfChats();
  },
});

export const MembersQuery = queryField((t) => {
  t.nonNull.connectionField('members', {
    type: 'User',
    additionalArgs: {
      chatId: nonNull(hashIdArg()),
    },
    authorize: async (_, { chatId }, { auth }) =>
      await auth.canViewChat(chatId),
    resolve: async (_, args, { prisma }) => {
      const { chatId } = args;
      return await findManyCursorConnection<
        User,
        Pick<Prisma.UserWhereUniqueInput, 'id'>
      >(
        (args) =>
          prisma.chat
            .findUniqueOrThrow({
              ...{ where: { id: chatId || undefined } },
            })
            .members({
              ...args,
            }),
        () =>
          prisma.chat
            .findUniqueOrThrow({
              ...{ where: { id: chatId || undefined } },
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
});
