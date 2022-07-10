import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { extendType, nonNull, stringArg } from 'nexus';

export const chats = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('chats', {
      type: 'ChatResult',
      resolve: async (_, __, { prisma, userId }) => {
        return await prisma.user
          .findUnique({
            where: {
              id: userId,
            },
          })
          .memberOfChats();
      },
    });
  },
});

export const chat = extendType({
  type: 'Query',
  definition(t) {
    t.field('chat', {
      type: 'Chat',
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

        if (!chat) {
          throw new UserInputError('Not found');
        }

        if (!chat.members.length) {
          throw new ForbiddenError('You do not have permission to this chat');
        }

        return chat;
      },
    });
  },
});
