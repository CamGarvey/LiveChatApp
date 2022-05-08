import { mutationField, nonNull, stringArg } from 'nexus';
import User from '../types/user';

export const createUser = mutationField('createUser', {
  type: User,
  args: {
    name: nonNull(stringArg()),
    email: stringArg(),
    username: stringArg(),
  },
  description: 'Create a User',
  resolve(_, { name, email, username }, { prisma }) {
    return prisma.user.create({
      data: {
        name,
        email: email ?? undefined,
        username,
      },
    });
  },
});
