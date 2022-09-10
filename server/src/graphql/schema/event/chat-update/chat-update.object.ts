import { objectType } from 'nexus';

export const ChatNameUpdated = objectType({
  name: 'NameUpdated',
  definition: (t) => {
    t.implements('Event');
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

export const ChatDescriptionUpdated = objectType({
  name: 'DescriptionUpdated',
  definition: (t) => {
    t.implements('Event');
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

export const ChatAdminsAddedUpdated = objectType({
  name: 'AdminsAdded',
  definition: (t) => {
    t.implements('Event');
    t.nonNull.list.nonNull.field('adminsAdded', {
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

export const ChatAdminsRemovedUpdated = objectType({
  name: 'AdminsRemoved',
  definition: (t) => {
    t.implements('Event');
    t.nonNull.list.nonNull.field('adminsRemoved', {
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

export const ChatMembersAddedUpdated = objectType({
  name: 'MembersAdded',
  definition: (t) => {
    t.implements('Event');
    t.nonNull.list.nonNull.field('membersAdded', {
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

export const ChatMembersRemovedUpdate = objectType({
  name: 'MembersRemoved',
  definition: (t) => {
    t.implements('Event');
    t.nonNull.list.nonNull.field('membersRemoved', {
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
