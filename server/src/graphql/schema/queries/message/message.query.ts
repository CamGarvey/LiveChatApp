import { Chat, Message } from '@prisma/client';
import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { nonNull, queryField, stringArg } from 'nexus';

export const message = queryField('message', {
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
    const message: Message & {
      chat: Chat & {
        members: {
          id: string;
        }[];
      };
    } = await prisma.message.findUnique({
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
