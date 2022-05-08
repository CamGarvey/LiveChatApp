import { intArg, mutationField, nonNull } from 'nexus';
import Message from '../types/message';

export const deleteMessage = mutationField('deleteMessage', {
  type: Message,
  args: {
    id: nonNull(intArg()),
  },
  description: 'Delete a Message',
  resolve(_, { id }, { prisma }) {
    return prisma.message.delete({
      where: {
        id,
      },
    });
  },
});
