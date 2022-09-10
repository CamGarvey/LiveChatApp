import { objectType } from 'nexus';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.implements('Event');
    t.nonNull.string('content', {
      resolve: async (parent, _, { prisma }) => {
        const message = await prisma.message.findUniqueOrThrow({
          where: { eventId: parent.id || undefined },
        });
        return message.content;
      },
    });
    t.nonNull.list.nonNull.field('likedBy', {
      type: 'User',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.message
          .findUniqueOrThrow({
            where: {
              eventId: parent.id,
            },
          })
          .likedBy();
      },
    });
  },
});
