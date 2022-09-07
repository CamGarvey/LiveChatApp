import { Request } from '@prisma/client';
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
    const request = await prisma.request.upsert({
      create: {
        type: 'FriendRequest',
        recipientId: friendId,
        createdById: userId,
      },
      update: {
        status: 'SENT',
        createdAt: new Date().toISOString(),
        recipientId: friendId,
        createdById: userId,
      },
      where: {
        recipientId_createdById: {
          recipientId: friendId,
          createdById: userId,
        },
      },
    });

    // Publish this new request
    pubsub.publish<SubscriptionPayload<Request>>(
      Subscription.FriendRequestSent,
      {
        recipients: [friendId],
        content: request,
      }
    );

    return request;
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
      auth.canCancelFriendRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub }) => {
      // Delete the request by setting deletedAt
      const request = await prisma.request.update({
        where: {
          id: friendRequestId,
        },
        data: {
          status: 'CANCELLED',
        },
      });

      // Publish this deleted request
      pubsub.publish<SubscriptionPayload<Request>>(
        Subscription.FriendRequestCancelled,
        {
          recipients: [request.recipientId],
          content: request,
        }
      );

      return request;
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
      auth.canDeclineFriendRequest(friendRequestId),
    resolve: async (_, { friendRequestId }, { prisma, pubsub }) => {
      // Decline the friend request
      const request = await prisma.request.update({
        where: {
          id: friendRequestId,
        },
        data: {
          status: 'DECLINED',
        },
      });

      // Publish this declined request
      pubsub.publish<SubscriptionPayload<Request>>(
        Subscription.FriendRequestDeclined,
        {
          recipients: [request.createdById],
          content: request,
        }
      );

      return request;
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
      const request: Request = await prisma.request.update({
        where: {
          id: friendRequestId,
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

      // Publish accepted friend request
      pubsub.publish<SubscriptionPayload<Request>>(
        Subscription.FriendRequestAccepted,
        {
          recipients: [request.createdById],
          content: request,
        }
      );
      // Publish new friend
      pubsub.publish(Subscription.FriendCreated, {
        userId: request.createdById,
        friend: user,
      });

      return request;
    },
  }
);
