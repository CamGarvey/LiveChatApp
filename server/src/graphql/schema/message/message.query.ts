import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { nonNull, queryField, stringArg } from 'nexus';

export const MessageQuery = queryField('message', {
  type: 'MessageResult',
  description: 'Get a message by id',
  args: {
    messageId: nonNull(
      stringArg({
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
    type: 'MessageResult',
    additionalArgs: {
      chatId: nonNull(
        stringArg({
          description: 'If set, filters users by given filter',
        })
      ),
    },
    authorize: async (_, { chatId }, { auth }) =>
      await auth.canViewChat(chatId),
    resolve: async (_, { chatId, after, first, before, last }, { prisma }) => {
      return findManyCursorConnection(
        (args) => {
          return prisma.message.findMany({
            ...args,
            ...{
              where: { id: chatId },
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
        { after, first, before, last }
      );
    },
  });
});
