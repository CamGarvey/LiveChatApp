import { objectType } from 'nexus';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.implements('Event');
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
    t.implements('Event');
    t.date('deletedAt');
  },
});
