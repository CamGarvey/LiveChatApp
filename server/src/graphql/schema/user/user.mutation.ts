import { ForbiddenError, UserInputError } from 'apollo-server-core';
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

export const SendFriendRequestMutation = mutationField('sendFriendRequest', {
  type: 'OpenFriendRequestNotification',
  description: 'Send a friend request to a user',
  args: {
    friendId: nonNull(hashIdArg()),
  },
  authorize: async (_, { friendId }, { auth }) =>
    await auth.canSendFriendRequest(friendId),
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    // Send request
    const request = await prisma.notification.create({
      data: {
        type: 'FRIEND_REQUEST',
        createdById: userId,
        recipients: {
          connect: {
            id: friendId,
          },
        },
      },
      include: {
        recipients: {
          select: {
            id: true,
          },
        },
      },
    });

    pubsub.publish(Subscription.FriendRequestCreated, request);

    return request;
  },
});

export const CancelFriendRequestMutation = mutationField(
  'cancelFriendRequest',
  {
    type: 'DeletedFriendRequestNotification',
    description: 'Cancel/Delete a sent Friend Request',
    args: {
      notificationId: nonNull(hashIdArg()),
    },
    resolve: async (_, { notificationId }, { prisma, userId, pubsub }) => {
      const notification = await prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          deletedAt: Date.now().toString(),
        },
      });

      if (!notification) {
        throw new UserInputError('Could not find notification');
      }

      pubsub.publish(Subscription.FriendRequestDeleted, notification);

      return notification;
    },
  }
);

export const DeclineFriendRequestMutation = mutationField(
  'declineFriendRequest',
  {
    type: 'DeletedFriendRequestNotification',
    description: 'Delete/Decline a received Friend Request',
    args: {
      notificationId: nonNull(hashIdArg()),
    },
    resolve: async (_, { notificationId }, { prisma, pubsub }) => {
      const notification = await prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          deletedAt: Date.now().toString(),
        },
      });

      if (!notification) {
        throw new UserInputError('Could not find notification');
      }

      pubsub.publish(Subscription.FriendRequestDeleted, notification);

      return notification;
    },
  }
);

export const AcceptFriendRequestMutation = mutationField(
  'acceptFriendRequest',
  {
    type: 'Friend',
    description: 'Accept a Users friend request',
    args: {
      notificationId: nonNull(hashIdArg()),
    },
    resolve: async (_, { notificationId }, { prisma, pubsub, userId }) => {
      const notification = await prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          deletedAt: Date.now().toString(),
        },
      });

      if (!notification) {
        throw new UserInputError('Could not find notification');
      }

      // Accept request
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          receivedFriendRequests: {
            // Remove received request
            disconnect: {
              id: friendId,
            },
          },
          friends: {
            // And add as friend
            connect: {
              id: friendId,
            },
          },
          friendsOf: {
            connect: {
              id: friendId,
            },
          },
        },
      });

      pubsub.publish(Subscription.UserFriendCreated, user);
      pubsub.publish(Subscription.UserFriendCreated, friend);

      return friend;
    },
  }
);

export const DeleteFriendMutation = mutationField('deleteFriend', {
  type: 'Stranger',
  description: 'Delete a Friend',
  args: {
    friendId: nonNull(hashIdArg()),
  },
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

    pubsub.publish(Subscription.UserFriendDeleted, { id: friendId });

    return newUser;
  },
});
