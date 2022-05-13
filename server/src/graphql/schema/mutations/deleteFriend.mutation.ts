import { intArg, mutationField, nonNull } from 'nexus';

export const deleteFriend = mutationField('deleteFriend', {
  type: 'Boolean',
  args: {
    userId: nonNull(intArg()),
    friendId: nonNull(intArg()),
  },
  description: 'Delete a Friend',
  resolve: async (_, { userId, friendId }, { prisma }) => {
    // Validate
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        AND: [
          {
            // is friend
            friends: {
              some: { id: friendId },
            },
          },
        ],
      },
    });

    if (user == null) {
      throw new Error('User does not exist or not friends');
    }

    // Delete user
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          disconnect: {
            id: friendId,
          },
        },
        friendsOf: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });

    return true;
  },
});
