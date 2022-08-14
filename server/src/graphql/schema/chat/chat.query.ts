import { ForbiddenError, UserInputError } from 'apollo-server-core';
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
