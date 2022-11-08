import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Member, Prisma, User } from '@prisma/client';
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
  resolve: async (_, { chatId }, { prisma, currentUserId }) => {
    const chat = await prisma.chat.findUniqueOrThrow({
      where: {
        id: chatId,
      },
      include: {
        members: {
          where: {
            id: currentUserId,
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
