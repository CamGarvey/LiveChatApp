import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Message } from '@prisma/client';
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
        messageId,
      },
      include: {
        chat: {
          include: {
            members: {
              select: {
                userId: true,
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

    if (!message.chat.members.map((x) => x.userId).includes(userId)) {
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
            chatId,
          },
        })
        .members();

      if (!members.find((member) => member.userId == userId)) {
        throw new ForbiddenError('You do not have permission to this chat');
      }
      return findManyCursorConnection<Message, { messageId: string }>(
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
              chatId,
            },
          }),
        { after, first, before, last }
      );
    },
  });
});
