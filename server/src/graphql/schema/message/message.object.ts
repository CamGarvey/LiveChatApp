import { objectType } from 'nexus';

export const InstantMessage = objectType({
  name: 'InstantMessage',
  definition(t) {
    t.implements('Message');
    t.nonNull.string('content');
    t.nonNull.list.nonNull.field('likedBy', {
      type: 'User',
      resolve: (parent, _, { prisma }) => {
        return prisma.message
          .findUniqueOrThrow({
            where: { id: parent.id || undefined },
          })
          .likedBy();
      },
    });
  },
});

export const DeletedMessage = objectType({
  name: 'DeletedMessage',
  definition: (t) => {
    t.implements('Message');
    t.date('deletedAt');
  },
});
