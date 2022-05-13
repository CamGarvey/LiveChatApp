import { intArg, mutationField, nonNull, stringArg } from 'nexus';
import Message from '../types/message';

export const updateMessage = mutationField('updateMessage', {
  type: Message,
  args: {
    id: nonNull(intArg()),
    content: nonNull(stringArg()),
  },
  description: 'Update a Message',
  resolve(_, { id, content }, { prisma }) {
    return prisma.message.update({
      data: {
        content,
      },
      where: {
        id,
      },
    });
  },
});
