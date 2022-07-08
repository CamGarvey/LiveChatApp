import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ForbiddenError } from 'apollo-server-core';
import { extendType, nonNull, stringArg } from 'nexus';

export const chatMessages = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.connectionField('chatMessages', {
      type: 'Message',
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
  },
});

export const chats = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('chats', {
      type: 'Chat',
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

        if (!chat?.members.length) {
          throw new ForbiddenError('You do not have permission to this chat');
        }
        return chat;
      },
    });
  },
});
