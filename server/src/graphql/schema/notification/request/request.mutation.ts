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
    const notification = await prisma.notification.upsert({
      create: {
        type: 'Request',
        recipientId: friendId,
        createdById: userId,
        request: {
          create: {
            type: 'FriendRequest',
          },
        },
      },
      update: {
        request: {
          update: {
            status: 'SENT',
          },
        },
        createdAt: new Date().toISOString(),
        recipientId: friendId,
        createdById: userId,
      },
      where: {},
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
      const request = await prisma.request.update({
        where: {
          notificationId: friendRequestId,
        },
        include: {
          notification: {
            include: {
              recipient: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
        data: {
          status: 'CANCELLED',
        },
      });

      // Publish this deleted request
      pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.FriendRequestCancelled,
        {
          recipients: [request.notification.recipient.id],
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
    type: 'FriendRequest',
    description: 'Decline a received Friend Request',
    args: {
      friendRequestId: nonNull(hashIdArg()),
    },
    authorize: (_, { friendRequestId }, { auth }) =>
      auth.canDeclineRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub }) => {
      // Decline the friend request
      const request = await prisma.request.update({
        where: {
          notificationId: friendRequestId,
        },
        include: {
          notification: true,
        },
        data: {
          status: 'DECLINED',
        },
      });

      // Publish this declined request
      pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.FriendRequestDeclined,
        {
          recipients: [request.notification.createdById],
          content: request.notification,
        }
      );

      return request.notification;
    },
  }
);

export const AcceptFriendRequestMutation = mutationField(
  'acceptFriendRequest',
  {
    type: 'FriendRequest',
    description: 'Accept a friend request',
    args: {
      friendRequestId: nonNull(hashIdArg()),
    },
    authorize: async (_, { friendRequestId }, { auth }) =>
      await auth.canAcceptFriendRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub, userId }) => {
      // Accept request
      const request = await prisma.request.update({
        where: {
          notificationId: friendRequestId,
        },
        include: {
          notification: true,
        },
        data: {
          status: 'ACCEPTED',
        },
      });

      // Add as friend
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
            connect: {
              id: request.notification.createdById,
            },
          },
          friendsOf: {
            connect: {
              id: request.notification.createdById,
            },
          },
        },
      });

      // Publish accepted friend request
      pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.FriendRequestAccepted,
        {
          recipients: [request.notification.createdById],
          content: request.notification,
        }
      );
      // Publish new friend
      pubsub.publish(Subscription.FriendCreated, {
        userId: request.notification.createdById,
        friend: user,
      });

      return request.notification;
    },
  }
);
