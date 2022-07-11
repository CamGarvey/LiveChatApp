import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ForbiddenError } from 'apollo-server-core';
import { extendType, nonNull, stringArg } from 'nexus';

export const messages = extendType({
  type: 'Query',
  definition(t) {
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
