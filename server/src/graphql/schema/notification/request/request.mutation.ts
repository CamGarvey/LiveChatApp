import { mutationField, nonNull } from 'nexus';
import { Subscription, NotificationPayload } from '../../../backing-types';
import { hashIdArg } from '../../shared';

export const SendFriendRequestMutation = mutationField('sendFriendRequest', {
  type: 'FriendRequest',
  description: 'Send a friend request to a user',
  args: {
    strangerId: nonNull(hashIdArg()),
  },
  authorize: (_, { strangerId }, { auth }) =>
    auth.canSendFriendRequest(strangerId),
  resolve: async (_, { strangerId }, { prisma, userId, pubsub }) => {
    const time = new Date().toISOString();
    // Create friend request
    // If there is already a friend request in the database then return that one
    const request = await prisma.request.upsert({
      create: {
        type: 'FRIEND_REQUEST',
        createdAt: time,
        recipient: {
          connect: {
            id: strangerId,
          },
        },
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
      update: {
        state: 'SENT',
      },
      where: {
        recipientId_createdById_type: {
          type: 'FRIEND_REQUEST',
          createdById: userId,
          recipientId: strangerId,
        },
      },
    });

    // The request is new if the createdAt is equal to the time variable
    if (request.createdAt.toISOString() === time) {
      // Publish this new request
      pubsub.publish<NotificationPayload>(Subscription.RequestSent, {
        recipients: [strangerId],
        content: request,
      });
    }

    return request;
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
    const request = await prisma.request.update({
      data: {
        state: 'CANCELLED',
      },
      where: {
        id: requestId,
      },
    });

    // Publish this deleted request
    pubsub.publish<NotificationPayload>(Subscription.RequestCancelled, {
      recipients: [request.recipientId],
      content: request,
    });

    return request;
  },
});

export const DeclineRequestMutation = mutationField('declineRequest', {
  type: 'Request',
  description: 'Decline a received request',
  args: {
    requestId: nonNull(hashIdArg()),
  },
  authorize: (_, { requestId }, { auth }) => auth.canDeclineRequest(requestId),
  resolve: async (_, { requestId }, { prisma, pubsub, userId }) => {
    // Decline request
    const request = await prisma.request.update({
      data: {
        state: 'DECLINED',
      },
      where: {
        id: requestId,
      },
    });
    // create an response alert
    const alert = await prisma.alert.create({
      data: {
        type: 'REQUEST_DECLINED',
        createdById: userId,
        recipients: {
          connect: {
            id: request.createdById,
          },
        },
        requestId,
      },
    });

    // Publish alert to the creator
    pubsub.publish<NotificationPayload>(Subscription.RequestCancelled, {
      recipients: [request.createdById],
      content: alert,
    });

    return request;
  },
});

export const AcceptRequestMutation = mutationField('acceptRequest', {
  type: 'Request',
  description: 'Accept a request',
  args: {
    requestId: nonNull(hashIdArg()),
  },
  authorize: async (_, { requestId }, { auth }) =>
    await auth.canAcceptRequest(requestId),
  resolve: async (_, { requestId }, { prisma, pubsub, userId }) => {
    // Get the request
    const request = await prisma.request.update({
      data: {
        state: 'ACCEPTED',
      },
      where: {
        id: requestId,
      },
    });
    // Respond to the request and create an alert
    const alert = await prisma.alert.create({
      data: {
        type: 'REQUEST_ACCEPTED',
        createdById: userId,
        recipients: {
          connect: {
            id: request.createdById,
          },
        },
        requestId,
      },
    });

    if (request.type === 'FRIEND_REQUEST') {
      // Add as friend
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
            connect: {
              id: request.createdById,
            },
          },
          friendsOf: {
            connect: {
              id: request.createdById,
            },
          },
        },
      });
    }

    // Publish alert
    pubsub.publish<NotificationPayload>(Subscription.RequestAccepted, {
      recipients: [request.createdById],
      content: alert,
    });

    return request;
  },
});
