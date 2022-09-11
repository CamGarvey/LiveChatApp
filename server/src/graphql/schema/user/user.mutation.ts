import { mutationField, nonNull, stringArg } from 'nexus';
import SubscriptionPayload from '../../backing-types/subscription-payload';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';
import { Notification } from '@prisma/client';

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
    // Delete friend
    const friend = await prisma.user.update({
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

    // Create alert notification for deleted friend
    const notification = await prisma.notification.create({
      data: {
        type: 'ALERT',
        recipients: {
          connect: {
            id: friendId,
          },
        },
        createdById: userId,
        alert: {
          create: {
            type: 'FRIEND_DELETED',
          },
        },
      },
    });

    // Publish notification to deleted friend
    pubsub.publish<SubscriptionPayload<Notification>>(
      Subscription.FriendDeleted,
      {
        recipients: [friendId],
        content: notification,
      }
    );

    return friend;
  },
});
