import { queryField, nonNull, stringArg } from 'nexus';

export const userQuery = queryField('user', {
  type: 'UserResult',
  args: {
    id: nonNull(
      stringArg({
        description: 'id of user',
      })
    ),
  },
  resolve: async (_, { id }, ctx) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  },
});
