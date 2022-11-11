import { list, nonNull, queryField } from 'nexus';
import { hashIdArg } from '../shared';

export const ChatQuery = queryField('chat', {
  type: 'Chat',
  description: 'Get a chat by id',
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
  description: 'Get all chats you are a member in',
  resolve: async (_, __, { prisma, currentUserId }) => {
    console.log(currentUserId);

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
