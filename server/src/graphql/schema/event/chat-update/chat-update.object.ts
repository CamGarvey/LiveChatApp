import { objectType } from 'nexus';

export const NameUpdatedEvent = objectType({
  name: 'NameUpdatedEvent',
  description: 'Chat name updated event',
  definition: (t) => {
    t.implements('ChatUpdateEvent');
    t.nonNull.string('nameBefore', {
      resolve: async (parent, _, { prisma }) => {
        const update = await prisma.chatUpdate.findUniqueOrThrow({
          where: {
            eventId: parent.id,
          },
        });
        return update.nameBefore!;
      },
    });
    t.nonNull.string('nameAfter', {
      resolve: async (parent, _, { prisma }) => {
        const update = await prisma.chatUpdate.findUniqueOrThrow({
          where: {
            eventId: parent.id,
          },
        });
        return update.nameAfter!;
      },
    });
  },
});

export const DescriptionUpdatedEvent = objectType({
  name: 'DescriptionUpdatedEvent',
  description: 'Chat description updated event',
  definition: (t) => {
    t.implements('ChatUpdateEvent');
    t.nonNull.string('descriptionBefore', {
      resolve: async (parent, _, { prisma }) => {
        const update = await prisma.chatUpdate.findUniqueOrThrow({
          where: {
            eventId: parent.id,
          },
        });
        return update.descriptionBefore!;
      },
    });
    t.nonNull.string('descriptionAfter', {
      resolve: async (parent, _, { prisma }) => {
        const update = await prisma.chatUpdate.findUniqueOrThrow({
          where: {
            eventId: parent.id,
          },
        });
        return update.descriptionAfter!;
      },
    });
  },
});

export const MembersAddedEvent = objectType({
  name: 'MembersAddedEvent',
  description: 'Members added to chat event',
  definition: (t) => {
    t.implements('MemberAlterationEvent');
  },
});

export const MembersRemovedEvent = objectType({
  name: 'MembersRemovedEvent',
  description: 'Members removed from chat event',
  definition: (t) => {
    t.implements('MemberAlterationEvent');
  },
});

export const RoleChangedEvent = objectType({
  name: 'RoleChangedEvent',
  description: 'Roles of members updated event',
  definition: (t) => {
    t.implements('MemberAlterationEvent');
    t.nonNull.field('newRole', {
      type: 'Role',
    });
  },
});
