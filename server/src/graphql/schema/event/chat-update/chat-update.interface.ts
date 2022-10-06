import { interfaceType } from 'nexus';

export const ChatUpdateEvent = interfaceType({
  name: 'ChatUpdateEvent',
  resolveType: async (source, { prisma }) => {
    const update = await prisma.chatUpdate.findUniqueOrThrow({
      where: {
        eventId: source.id,
      },
    });
    switch (update.type) {
      case 'ADMINS_ADDED':
        return 'AdminsAddedEvent';
      case 'ADMINS_REMOVED':
        return 'AdminsRemovedEvent';
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
    t.implements('Event');
  },
});

export const UserAlterationEvent = interfaceType({
  name: 'UserAlterationEvent',
  resolveType: async (source, { prisma }) => {
    const update = await prisma.chatUpdate.findUniqueOrThrow({
      where: {
        eventId: source.id,
      },
    });
    switch (update.type) {
      case 'ADMINS_ADDED':
        return 'AdminsAddedEvent';
      case 'ADMINS_REMOVED':
        return 'AdminsRemovedEvent';
      case 'MEMBERS_ADDED':
        return 'MembersAddedEvent';
      case 'MEMBERS_REMOVED':
        return 'MembersRemovedEvent';
      default:
        return null;
    }
  },
  definition: (t) => {
    t.implements('ChatUpdateEvent');
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chatUpdate
          .findUniqueOrThrow({
            where: {
              eventId: parent.id,
            },
          })
          .users();
      },
    });
  },
});
