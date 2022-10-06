import { interfaceType } from 'nexus';

export const ChatUpdate = interfaceType({
  name: 'ChatUpdate',
  resolveType: async (source, { prisma }) => {
    const update = await prisma.chatUpdate.findUniqueOrThrow({
      where: {
        eventId: source.id,
      },
    });
    switch (update.type) {
      case 'ADMINS_ADDED':
        return 'AdminsAdded';
      case 'ADMINS_REMOVED':
        return 'AdminsRemoved';
      case 'MEMBERS_ADDED':
        return 'MembersAdded';
      case 'MEMBERS_REMOVED':
        return 'MembersRemoved';
      case 'NAME_UPDATED':
        return 'NameUpdated';
      case 'DESCRIPTION_UPDATED':
        return 'DescriptionUpdated';
      default:
        return null;
    }
  },
  definition: (t) => {
    t.implements('Event');
  },
});

export const UserAlteration = interfaceType({
  name: 'UserAlteration',
  resolveType: async (source, { prisma }) => {
    const update = await prisma.chatUpdate.findUniqueOrThrow({
      where: {
        eventId: source.id,
      },
    });
    switch (update.type) {
      case 'ADMINS_ADDED':
        return 'AdminsAdded';
      case 'ADMINS_REMOVED':
        return 'AdminsRemoved';
      case 'MEMBERS_ADDED':
        return 'MembersAdded';
      case 'MEMBERS_REMOVED':
        return 'MembersRemoved';
      default:
        return null;
    }
  },
  definition: (t) => {
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
