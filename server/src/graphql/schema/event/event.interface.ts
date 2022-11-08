import { Event } from '@prisma/client';
import { interfaceType } from 'nexus';

export const EventInterface = interfaceType({
  name: 'Event',
  resolveType: async (source: Event, { prisma }) => {
    if (source.deletedAt) {
      return 'DeletedEvent';
    }
    if (source.type === 'MESSAGE') {
      return 'MessageEvent';
    }

    const update = await prisma.chatUpdate.findUniqueOrThrow({
      where: {
        eventId: source.id,
      },
    });
    switch (update.type) {
      case 'ROLE_CHANGED':
        return 'RoleChangedEvent';
      case 'MEMBERS_ADDED':
        return 'MembersAddedEvent';
      case 'MEMBERS_REMOVED':
        return 'MembersRemovedEvent';
      case 'NAME_UPDATED':
        return 'NameUpdatedEvent';
      case 'DESCRIPTION_UPDATED':
        return 'DescriptionUpdatedEvent';
      default:
        return null;
    }
  },
  definition: (t) => {
    t.nonNull.hashId('id');
    t.nonNull.hashId('createdById');
    t.nonNull.field('createdBy', {
      type: 'User',
      resolve: async (parent, __, { prisma }) => {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: parent.createdById || undefined,
          },
        });
      },
    });
    t.nonNull.boolean('isCreator', {
      resolve: (parent, _, { currentUserId }) => {
        return parent.createdById === currentUserId;
      },
    });
    t.nonNull.date('updatedAt');
    t.nonNull.date('createdAt');
    t.nonNull.hashId('chatId');
    t.nonNull.field('chat', {
      type: 'Chat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findUniqueOrThrow({
          where: {
            id: parent.chatId || undefined,
          },
        });
      },
    });
  },
});
