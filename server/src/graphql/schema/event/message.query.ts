import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Message, Prisma } from '@prisma/client';
import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { nonNull, queryField, stringArg } from 'nexus';
import { hashIdArg } from '../shared';

function encodeCursor<Cursor>(prismaCursor: Cursor) {
  return Buffer.from(JSON.stringify(prismaCursor)).toString('base64');
}

function decodeCursor(cursor: string) {
  return JSON.parse(Buffer.from(cursor, 'base64').toString('ascii'));
}

export const MessageQuery = queryField('message', {
  type: 'InstantMessage',
  description: 'Get a message by id',
  args: {
    messageId: nonNull(
      hashIdArg({
        description: 'id of message',
      })
    ),
  },
  authorize: async (_, { messageId }, { auth }) =>
    await auth.canViewMessage(messageId),
  resolve: async (_, { messageId }, { prisma }) => {
    return await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });
  },
});

export const MessagesQuery = queryField((t) => {
  t.nonNull.connectionField('messages', {
    type: 'InstantMessage',
    additionalArgs: {
      chatId: nonNull(hashIdArg()),
    },
    authorize: async (_, { chatId }, { auth }) =>
      await auth.canViewChat(chatId),
    resolve: async (_, { chatId, after, first, before, last }, { prisma }) => {
      return findManyCursorConnection<
        Message,
        Pick<Prisma.UserWhereUniqueInput, 'id'>
      >(
        (args) => {
          return prisma.message.findMany({
            ...args,
            ...{
              where: { chatId },
              orderBy: {
                createdAt: 'asc',
              },
            },
          });
        },

        () =>
          prisma.message.count({
            where: {
              id: chatId,
            },
          }),
        { after, first, before, last },
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
