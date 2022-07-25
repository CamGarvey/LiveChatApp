import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';

export const UpdateMeMutation = mutationField('updateMe', {
  type: 'Me',
  description: 'Update current user',
  args: {
    email: nonNull(stringArg()),
    username: nonNull(stringArg()),
  },
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

export const DeleteFriendMutation = mutationField('deleteFriend', {
  type: 'Stranger',
  description: 'Delete a Friend',
  args: {
    friendId: nonNull(hashIdArg()),
  },
  authorize: async (_, { friendId }, { auth }) =>
    await auth.canDeleteFriend(friendId),
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    // Delete user
    const user = await prisma.user.update({
      where: {
        id: friendId,
      },
      data: {
        friends: {
          disconnect: {
            id: userId,
          },
        },
        friendsOf: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    pubsub.publish(Subscription.FriendDeleted, user);

    return user;
  },
});
