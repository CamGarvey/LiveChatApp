import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Event, Prisma } from '@prisma/client';
import { nonNull, queryField } from 'nexus';
import { hashIdArg } from '../shared';

export const EventQuery = queryField('event', {
  type: 'Event',
  description: 'Get a event by id',
  args: {
    eventId: nonNull(
      hashIdArg({
        description: 'Id of event',
      })
    ),
  },
  authorize: async (_, { eventId }, { auth }) =>
    await auth.canViewEvent(eventId),
  resolve: async (_, { eventId }, { prisma }) => {
    return await prisma.event.findFirstOrThrow({
      where: {
        id: eventId,
      },
    });
  },
});

export const EventsQuery = queryField((t) => {
  t.nonNull.connectionField('events', {
    type: 'Event',
    description: 'Get events based on chat id',
    additionalArgs: {
      chatId: nonNull(
        hashIdArg({
          description: 'Id of chat',
        })
      ),
    },
    authorize: async (_, { chatId }, { auth }) =>
      await auth.canViewChat(chatId),
    resolve: async (_, { chatId, after, first, before, last }, { prisma }) => {
      return findManyCursorConnection<
        Event,
        Pick<Prisma.UserWhereUniqueInput, 'id'>
      >(
        (args) => {
          return prisma.event.findMany({
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
          prisma.event.count({
            where: {
              id: chatId,
            },
          }),
        { after, first, before, last },
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
