import { objectType } from 'nexus';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.implements('IMessage');
    t.nonNull.string('content');
    t.nonNull.list.nonNull.field('likedBy', {
      type: 'User',
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
