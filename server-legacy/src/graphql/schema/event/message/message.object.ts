import { objectType } from 'nexus';

export const MessageEvent = objectType({
  name: 'MessageEvent',
  description: 'Message event',
  definition(t) {
    t.implements('Event');
    t.nonNull.string('content', {
      description: 'Content of message',
      resolve: async (parent, _, { prisma }) => {
        const message = await prisma.message.findUniqueOrThrow({
          where: { eventId: parent.id || undefined },
        });
        return message.content;
      },
    });
    t.nonNull.list.nonNull.field('likedBy', {
      type: 'User',
      description: 'Users that liked this message',
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
