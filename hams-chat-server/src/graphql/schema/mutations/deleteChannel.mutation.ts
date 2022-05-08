import { intArg, mutationField, nonNull } from 'nexus';
import Channel from '../types/channel';

export const deleteChannel = mutationField('deleteChannel', {
  type: 'Boolean',
  args: {
    id: nonNull(intArg()),
  },
  description: 'Delete a Channel',
  resolve: async (_, { id }, { prisma }) => {
    try {
      await prisma.channel.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
