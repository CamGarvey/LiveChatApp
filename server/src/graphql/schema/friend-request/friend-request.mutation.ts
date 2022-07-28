import { mutationField, nonNull } from 'nexus';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';

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
    const request = await prisma.friendRequest.upsert({
      create: {
        recipientId: friendId,
        createdById: userId,
      },
      update: {
        status: 'SENT',
      },
      where: {
        recipientId_createdById: {
          recipientId: friendId,
          createdById: userId,
        },
      },
    });

    // Publish this new request
    pubsub.publish(Subscription.FriendRequestSent, request);

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
      const request = await prisma.friendRequest.update({
        where: {
          id: friendRequestId,
        },
        data: {
          status: 'CANCELLED',
        },
      });

      // Publish this deleted request
      pubsub.publish(Subscription.FriendRequestCancelled, request);

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
      const request = await prisma.friendRequest.update({
        where: {
          id: friendRequestId,
        },
        data: {
          status: 'DECLINED',
        },
      });

      // Publish this declined request
      pubsub.publish(Subscription.FriendRequestDeclined, request);

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
      const request = await prisma.friendRequest.update({
        where: {
          id: friendRequestId,
        },
        data: {
          status: 'ACCEPTED',
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
      pubsub.publish(Subscription.FriendRequestAccepted, request);

      return request;
    },
  }
);
