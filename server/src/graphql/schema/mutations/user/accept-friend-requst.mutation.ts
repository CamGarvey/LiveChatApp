import { ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../../backing-types';

export const acceptFriendRequest = mutationField('acceptFriendRequest', {
  type: 'Friend',
  args: {
    friendId: nonNull(stringArg()),
  },
  description: 'Accept a Users friend request',
  resolve: async (_, { friendId }, { prisma, pubsub, userId }) => {
    const receivedRequests = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .receivedFriendRequests();

    const friend = receivedRequests.find((request) => request.id == friendId);

    if (!friend) {
      throw new ForbiddenError('You do not have a request from this user');
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
});
