import { extendType, intArg, nonNull } from 'nexus';
import Message from '../types/message';

// get ALl Messages
export const MessageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('Message', {
      type: Message,
      args: {
        id: nonNull(
          intArg({
            description: 'id of message',
          })
        ),
      },
      resolve: async (_, { id }, { prisma }) => {
        return prisma.message.findUnique({
          where: {
            id: id,
          },
        });
      },
    });
  },
});
