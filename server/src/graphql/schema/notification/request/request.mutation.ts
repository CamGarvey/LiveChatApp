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
        type: 'Request',
        recipients: {
          connect: {
            id: friendId,
          },
        },
        createdById: userId,
        request: {
          create: {
            type: 'FriendRequest',
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
    type: 'RequestResponse',
    description: 'Decline a received Friend Request',
    args: {
      friendRequestId: nonNull(hashIdArg()),
    },
    authorize: (_, { friendRequestId }, { auth }) =>
      auth.canDeclineRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub, userId }) => {
      // Create a request response
      const response = await prisma.requestResponse.create({
        include: {
          request: {
            include: {
              notification: true,
            },
          },
        },
        data: {
          request: {
            connect: {
              notificationId: friendRequestId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          status: 'DECLINED',
        },
      });

      // Publish response to the creator
      pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.FriendRequestDeclined,
        {
          recipients: [response.request.notification.createdById],
          content: response.request.notification,
        }
      );

      return response;
    },
  }
);

export const AcceptFriendRequestMutation = mutationField(
  'acceptFriendRequest',
  {
    type: 'RequestResponse',
    description: 'Accept a friend request',
    args: {
      friendRequestId: nonNull(hashIdArg()),
    },
    authorize: async (_, { friendRequestId }, { auth }) =>
      await auth.canAcceptFriendRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub, userId }) => {
      // Accept request
      const response = await prisma.requestResponse.create({
        data: {
          request: {
            connect: {
              notificationId: friendRequestId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          status: 'ACCEPTED',
        },
        include: {
          request: {
            select: {
              notification: true,
            },
          },
        },
      });

      const friendId = response.request.notification.createdById;

      // Add as friend
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
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

      // Publish accepted friend request
      pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.FriendRequestAccepted,
        {
          recipients: [friendId],
          content: response.request.notification,
        }
      );
      // Publish new friend
      pubsub.publish(Subscription.FriendCreated, {
        userId: friendId,
        friend: user,
      });

      return response;
    },
  }
);
