import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Member, Prisma } from '@prisma/client';
import { nonNull, queryField } from 'nexus';
import { hashIdArg } from '../../shared';

export const MembersQuery = queryField((t) => {
  t.nonNull.connectionField('members', {
    type: 'Member',
    description: 'Get Members based on chat id',
    additionalArgs: {
      chatId: nonNull(
        hashIdArg({
          description: 'Id of the chat',
        })
      ),
    },
    authorize: async (_, { chatId }, { auth }) =>
      await auth.canViewChat(chatId),
    resolve: async (_, args, { prisma }) => {
      const { chatId } = args;
      return await findManyCursorConnection<
        Member,
        Pick<Prisma.MemberWhereUniqueInput, 'id'>
      >(
        (args) =>
          prisma.chat
            .findUniqueOrThrow({
              ...{ where: { id: chatId || undefined } },
            })
            .members({
              ...args,
            }),
        () =>
          prisma.chat
            .findUniqueOrThrow({
              ...{ where: { id: chatId || undefined } },
              select: {
                _count: {
                  select: {
                    members: true,
                  },
                },
              },
            })
            .then((x) => x._count.members),
        args,
        {
          getCursor: (record) => ({ id: record.id }),
          encodeCursor: (cursor) =>
            Buffer.from(JSON.stringify(cursor)).toString('base64'),
          decodeCursor: (cursor) =>
            JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
        }
      );
    },
  });
});
