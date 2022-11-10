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
  authorize: (_, { chatId }, { auth }) => auth.canViewChat(chatId),
  resolve: async (_, { chatId }, { prisma }) => {
    const chat = await prisma.chat.findUniqueOrThrow({
      where: {
        id: chatId,
      },
    });
    return chat;
  },
});

export const ChatsQuery = queryField('chats', {
  type: nonNull(list(nonNull('Chat'))),
  resolve: async (_, __, { prisma, currentUserId }) => {
    const members = await prisma.member.findMany({
      where: {
        userId: currentUserId,
      },
      include: {
        chat: true,
      },
    });
    return members.map((x) => x.chat);
  },
});
