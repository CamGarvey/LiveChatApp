import { Event } from '@prisma/client';
import { interfaceType } from 'nexus';

export const EventInterface = interfaceType({
  name: 'Event',
  description: 'A chat event',
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
    t.nonNull.hashId('id', {
      description: 'Id of chat',
    });
    t.nonNull.hashId('createdById', {
      description: 'Id of user that created the chat',
    });
    t.nonNull.field('createdBy', {
      type: 'User',
      description: 'User that created the chat',
      resolve: async (parent, __, { prisma }) => {
        return await prisma.user.findUniqueOrThrow({
          where: {
            id: parent.createdById || undefined,
          },
        });
      },
    });
    t.nonNull.boolean('isCreator', {
      description: 'Are you the creator of the chat?',
      resolve: (parent, _, { currentUserId }) => {
        return parent.createdById === currentUserId;
      },
    });
    t.nonNull.date('updatedAt', {
      description: 'Time of last update',
    });
    t.nonNull.date('createdAt', {
      description: 'Time of creation',
    });
    t.nonNull.hashId('chatId', {
      description: 'Id of chat associated with event',
    });
    t.nonNull.field('chat', {
      type: 'Chat',
      description: 'Chat associated with event',
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
