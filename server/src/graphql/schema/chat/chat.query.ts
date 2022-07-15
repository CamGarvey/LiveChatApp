import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { list, nonNull, queryField, stringArg } from 'nexus';

export const ChatQuery = queryField('chat', {
  type: 'ChatResult',
  args: {
    chatId: nonNull(
      stringArg({
        description: 'Id of chat',
      })
    ),
  },
  resolve: async (_, { chatId }, { prisma, userId }) => {
    const chat = await prisma.chat.findUnique({
      where: {
        chatId,
      },
      include: {
        members: {
          where: {
            userId,
          },
        },
      },
    });

    if (!chat) {
      throw new UserInputError('Not found');
    }

    if (!chat.members.length) {
      throw new ForbiddenError('You do not have permission to this chat');
    }

    return chat;
  },
});

export const ChatsQuery = queryField('chats', {
  type: nonNull(list(nonNull('ChatResult'))),
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.user
      .findUnique({
        where: {
          userId,
        },
      })
      .memberOfChats();
  },
});
