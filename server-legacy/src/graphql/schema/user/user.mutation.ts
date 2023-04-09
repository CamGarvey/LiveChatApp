import { mutationField, nonNull, stringArg } from 'nexus';
import { NotificationPayload } from '../../backing-types';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';

export const UpdateUserMutation = mutationField('updateUser', {
  type: 'Me',
  description: 'Update current user',
  args: {
    name: nonNull(stringArg()),
  },
  resolve(_, { name }, { currentUserId, prisma }) {
    return prisma.user.update({
      data: {
        name,
      },
      where: {
        id: currentUserId,
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
  resolve: async (_, { friendId }, { prisma, currentUserId, pubsub }) => {
    // Delete friend
    const friend = await prisma.user.update({
      where: {
        id: friendId,
      },
      data: {
        friends: {
          disconnect: {
            id: currentUserId,
          },
        },
        friendsOf: {
          disconnect: {
            id: currentUserId,
          },
        },
      },
    });

    // Create alert for deleted friend
    const alert = await prisma.alert.create({
      data: {
        type: 'FRIEND_DELETED',
        recipients: {
          connect: {
            id: friendId,
          },
        },
        createdById: currentUserId,
      },
    });

    // Publish notification to deleted friend
    pubsub.publish<NotificationPayload>(Subscription.FriendDeletedAlert, {
      recipients: [friendId],
      content: alert,
    });

    return friend;
  },
});
