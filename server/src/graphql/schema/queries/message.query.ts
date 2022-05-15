import { extendType, intArg, nonNull, queryField } from 'nexus';
import Message from '../types/message';

export const MessageQuery = queryField('Message', {
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
