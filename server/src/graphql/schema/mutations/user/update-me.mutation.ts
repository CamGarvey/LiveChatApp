import { mutationField, nonNull, stringArg } from 'nexus';

export const updateMe = mutationField('updateMe', {
  type: 'Me',
  args: {
    email: nonNull(stringArg()),
    username: nonNull(stringArg()),
  },
  description: 'Update current User',
  resolve(_, { email, username }, { userId, prisma }) {
    return prisma.user.update({
      data: {
        email,
        username,
      },
      where: {
        id: userId,
      },
    });
  },
});
