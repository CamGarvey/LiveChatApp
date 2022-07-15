import { objectType } from 'nexus';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.implements('MessageInterface');
    t.nonNull.string('content');
    t.nonNull.list.nonNull.field('likedBy', {
      type: 'UserResult',
      resolve: (parent, _, { prisma }) => {
        return prisma.message
          .findUnique({
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
    t.implements('MessageInterface');
  },
});
