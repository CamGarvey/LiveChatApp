import { objectType } from 'nexus';

export const ChatNameUpdate = objectType({
  name: 'ChatNameUpdate',
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

export const ChatDescriptionUpdate = objectType({
  name: 'ChatDescriptionUpdate',
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

export const ChatAdminsAddedUpdate = objectType({
  name: 'ChatAdminsAddedUpdate',
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

export const ChatAdminsRemovedUpdate = objectType({
  name: 'ChatAdminsRemovedUpdate',
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

export const ChatMembersAddedUpdate = objectType({
  name: 'ChatMembersAddedUpdate',
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
  name: 'ChatMembersRemovedUpdate',
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
