import { intArg, mutationField, nonNull } from 'nexus';
import User from '../types/user';

export const deleteUser = mutationField('deleteUser', {
  type: User,
  args: {
    id: nonNull(intArg()),
  },
  description: 'Delete a User',
  resolve(_, { id }, { prisma }) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  },
});
