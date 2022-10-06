import { objectType } from 'nexus';

export const NameUpdatedEvent = objectType({
  name: 'NameUpdatedEvent',
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

export const AdminsAddedEvent = objectType({
  name: 'AdminsAddedEvent',
  definition: (t) => {
    t.implements('UserAlterationEvent');
  },
});

export const AdminsRemovedEvent = objectType({
  name: 'AdminsRemovedEvent',
  definition: (t) => {
    t.implements('UserAlterationEvent');
  },
});

export const MembersAddedEvent = objectType({
  name: 'MembersAddedEvent',
  definition: (t) => {
    t.implements('UserAlterationEvent');
  },
});

export const MembersRemovedEvent = objectType({
  name: 'MembersRemovedEvent',
  definition: (t) => {
    t.implements('UserAlterationEvent');
  },
});
