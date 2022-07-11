import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../../backing-types';

export const deleteFriend = mutationField('deleteFriend', {
  type: 'Stranger',
  args: {
    friendId: nonNull(stringArg()),
  },
  description: 'Delete a Friend',
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    // Validate
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: {
          where: {
            id: friendId,
          },
        },
      },
    });

    if (user == null) {
      throw new Error('User does not exist');
    }

    if (user.friends.length == 0) {
      throw new Error('You are not friends with this user');
    }

    // Delete user
    const newUser = await prisma.user.update({
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

    pubsub.publish(Subscription.UserFriendDeleted, user);
    pubsub.publish(Subscription.UserFriendDeleted, { id: friendId });

    return newUser;
  },
});
