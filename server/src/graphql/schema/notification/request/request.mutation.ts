import { Notification } from '@prisma/client';
import { mutationField, nonNull } from 'nexus';
import SubscriptionPayload from 'src/graphql/backing-types/subscription-payload';
import { Subscription } from '../../../backing-types';
import { hashIdArg } from '../../shared';

export const SendFriendRequestMutation = mutationField('sendFriendRequest', {
  type: 'FriendRequest',
  description: 'Send a friend request to a user',
  args: {
    friendId: nonNull(hashIdArg()),
  },
  authorize: (_, { friendId }, { auth }) => auth.canSendFriendRequest(friendId),
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    // Create a new friend request
    // If there is already a friend request in the database then update that one
    const notification = await prisma.notification.create({
      data: {
        type: 'RESPONSE',
        recipients: {
          connect: {
            id: friendId,
          },
        },
        createdById: userId,
        request: {
          create: {
            type: 'FRIEND_REQUEST',
          },
        },
      },
    });

    // Publish this new request
    pubsub.publish<SubscriptionPayload<Notification>>(
      Subscription.FriendRequestSent,
      {
        recipients: [friendId],
        content: notification,
      }
    );

    return notification;
  },
});

export const CancelFriendRequestMutation = mutationField(
  'cancelFriendRequest',
  {
    type: 'FriendRequest',
    description: 'Cancel/Delete a sent Friend Request',
    args: {
      friendRequestId: nonNull(hashIdArg()),
    },
    authorize: (_, { friendRequestId }, { auth }) =>
      auth.canCancelRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub }) => {
      // Delete the request by setting deletedAt
      const request = await prisma.request.delete({
        where: {
          notificationId: friendRequestId,
        },
        include: {
          notification: {
            include: {
              recipients: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      // Publish this deleted request
      pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.FriendRequestCancelled,
        {
          recipients: request.notification.recipients.map((x) => x.id),
          content: request.notification,
        }
      );

      return request.notification;
    },
  }
);

export const DeclineFriendRequestMutation = mutationField(
  'declineFriendRequest',
  {
    type: 'FriendRequestResponse',
    description: 'Decline a received Friend Request',
    args: {
      friendRequestId: nonNull(hashIdArg()),
    },
    authorize: (_, { friendRequestId }, { auth }) =>
      auth.canDeclineRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub, userId }) => {
      const requestNotification = await prisma.notification.findUniqueOrThrow({
        where: {
          id: friendRequestId,
        },
        select: {
          createdById: true,
        },
      });
      // Create a new notification of type response
      const responseNotification = await prisma.notification.create({
        data: {
          type: 'RESPONSE',
          createdById: userId,
          recipients: {
            connect: {
              id: requestNotification.createdById,
            },
          },
          response: {
            create: {
              status: 'DECLINED',
              requestId: friendRequestId,
            },
          },
        },
      });

      // Publish response to the creator
      pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.FriendRequestDeclined,
        {
          recipients: [requestNotification.createdById],
          content: responseNotification,
        }
      );

      return responseNotification;
    },
  }
);

export const AcceptFriendRequestMutation = mutationField(
  'acceptFriendRequest',
  {
    type: 'FriendRequestResponse',
    description: 'Accept a friend request',
    args: {
      friendRequestId: nonNull(hashIdArg()),
    },
    authorize: async (_, { friendRequestId }, { auth }) =>
      await auth.canAcceptFriendRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub, userId }) => {
      const requestNotification = await prisma.notification.findUniqueOrThrow({
        where: {
          id: friendRequestId,
        },
        select: {
          createdById: true,
        },
      });
      // Create a new notification of type response
      const responseNotification = await prisma.notification.create({
        data: {
          type: 'RESPONSE',
          createdById: userId,
          recipients: {
            connect: {
              id: requestNotification.createdById,
            },
          },
          response: {
            create: {
              status: 'ACCEPTED',
              requestId: friendRequestId,
            },
          },
        },
      });

      // Add as friend
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
            connect: {
              id: requestNotification.createdById,
            },
          },
          friendsOf: {
            connect: {
              id: requestNotification.createdById,
            },
          },
        },
      });

      // Publish accepted friend request response
      pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.FriendRequestAccepted,
        {
          recipients: [requestNotification.createdById],
          content: responseNotification,
        }
      );

      return;
    },
  }
);
