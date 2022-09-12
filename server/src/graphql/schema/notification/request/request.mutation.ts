import { Notification } from '@prisma/client';
import { mutationField, nonNull } from 'nexus';
import { SubscriptionPayload, Subscription } from '../../../backing-types';
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
      Subscription.RequestSent,
      {
        recipients: [friendId],
        content: notification,
      }
    );

    return notification;
  },
});

export const CancelRequestMutation = mutationField('cancelRequest', {
  type: 'Request',
  description: 'Cancel a sent request',
  args: {
    requestId: nonNull(hashIdArg()),
  },
  authorize: (_, { requestId }, { auth }) => auth.canCancelRequest(requestId),
  resolve: async (_, { requestId }, { prisma, pubsub }) => {
    // Delete the request by setting deletedAt
    const request = await prisma.request.delete({
      where: {
        notificationId: requestId,
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
      Subscription.RequestCancelled,
      {
        recipients: request.notification.recipients.map((x) => x.id),
        content: request.notification,
      }
    );

    return request.notification;
  },
});

export const DeclineRequestMutation = mutationField('declineRequest', {
  type: 'Response',
  description: 'Decline a received request',
  args: {
    requestId: nonNull(hashIdArg()),
  },
  authorize: (_, { requestId }, { auth }) => auth.canDeclineRequest(requestId),
  resolve: async (_, { requestId }, { prisma, pubsub, userId }) => {
    const requestNotification = await prisma.notification.findUniqueOrThrow({
      where: {
        id: requestId,
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
            requestId: requestId,
          },
        },
      },
    });

    // Publish response to the creator
    pubsub.publish<SubscriptionPayload<Notification>>(
      Subscription.RequestDeclined,
      {
        recipients: [requestNotification.createdById],
        content: responseNotification,
      }
    );

    return responseNotification;
  },
});

export const AcceptRequestMutation = mutationField('acceptRequest', {
  type: 'Response',
  description: 'Accept a request',
  args: {
    requestId: nonNull(hashIdArg()),
  },
  authorize: async (_, { requestId }, { auth }) =>
    await auth.canAcceptRequest(requestId),
  resolve: async (_, { requestId }, { prisma, pubsub, userId }) => {
    const requestNotification = await prisma.notification.findUniqueOrThrow({
      where: {
        id: requestId,
      },
      select: {
        createdById: true,
        request: {
          select: {
            type: true,
          },
        },
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
            requestId: requestId,
          },
        },
      },
    });

    if (requestNotification.request?.type === 'FRIEND_REQUEST') {
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
    }

    // Publish accepted request response
    pubsub.publish<SubscriptionPayload<Notification>>(
      Subscription.RequestAccepted,
      {
        recipients: [requestNotification.createdById],
        content: responseNotification,
      }
    );

    return responseNotification;
  },
});
