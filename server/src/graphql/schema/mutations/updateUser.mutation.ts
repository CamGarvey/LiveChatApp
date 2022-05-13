import { intArg, mutationField, nonNull, stringArg } from 'nexus';
import User from '../types/user';

export const updateUser = mutationField('updateUser', {
  type: User,
  args: {
    id: nonNull(intArg()),
    email: nonNull(stringArg()),
    username: nonNull(stringArg()),
  },
  description: 'Update a User',
  resolve(_, { id, email, username }, { prisma }) {
    return prisma.user.update({
      data: {
        email,
        username,
      },
      where: {
        id,
      },
    });
  },
});
