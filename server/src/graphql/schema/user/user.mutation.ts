import { mutationField, nonNull, stringArg } from 'nexus';
import SubscriptionPayload from '../../backing-types/subscription-payload';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';

export const UpdateUserMutation = mutationField('updateUser', {
  type: 'Me',
  description: 'Update current user',
  args: {
    name: nonNull(stringArg()),
  },
  resolve(_, { name }, { userId, prisma }) {
    return prisma.user.update({
      data: {
        name,
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
  authorize: (_, { friendId }, { auth }) => auth.canDeleteFriend(friendId),
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    // Delete user
    const user = await prisma.user.update({
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

    const friend = await prisma.user.findUnique({
      where: {
        id: friendId,
      },
    });

    pubsub.publish<SubscriptionPayload>(Subscription.FriendDeleted, {
      recipients: [friendId],
      content: user,
    });

    return friend;
  },
});
