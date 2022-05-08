import { intArg, mutationField, nonNull } from 'nexus';
import User from '../types/user';

export const deleteFriendRequest = mutationField('deleteFriendRequest', {
  type: 'Boolean',
  args: {
    userId: nonNull(intArg()),
    friendId: nonNull(intArg()),
  },
  description: 'Delete a received Friend Request',
  resolve: async (_, { userId, friendId }, { prisma }) => {
    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          sentFriendRequests: {
            connect: {
              id: friendId,
            },
          },
        },
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
