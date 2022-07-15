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
  resolve: async (_, { messageId }, { userId, prisma }) => {
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
      include: {
        chat: {
          include: {
            members: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    if (!message) {
      throw new UserInputError('Not found');
    }

    console.log({ message });

    if (!message.chat.members.map((x) => x.id).includes(userId)) {
      throw new ForbiddenError(
        'You do not have permission to view this message'
      );
    }

    return message;
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
    resolve: async (
      _,
      { chatId, after, first, before, last },
      { prisma, userId }
    ) => {
      const members = await prisma.chat
        .findUnique({
          where: {
            id: chatId,
          },
        })
        .members();

      if (!members.find((member) => member.id == userId)) {
        throw new ForbiddenError('You do not have permission to this chat');
      }
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