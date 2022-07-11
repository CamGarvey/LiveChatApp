import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../../backing-types';

export const sendFriendRequest = mutationField('sendFriendRequest', {
  type: 'Stranger',
  args: {
    friendId: nonNull(stringArg()),
  },
  description: 'Send a Friend Request to a User',
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: {
          where: {
            id: friendId,
          },
        },
        sentFriendRequests: {
          where: {
            id: friendId,
          },
        },
        receivedFriendRequests: {
          where: {
            id: friendId,
          },
        },
      },
    });

    if (user == null) {
      throw new UserInputError('User does not exist');
    }

    if (user.friends.length) {
      throw new ForbiddenError('Already friends with this user');
    }

    if (user.sentFriendRequests.length) {
      throw new ForbiddenError('Friend request already sent');
    }

    if (user.receivedFriendRequests.length) {
      throw new ForbiddenError('You have a request from this user');
    }

    // Send request
    const friend = await prisma.user.update({
      where: {
        id: friendId,
      },
      data: {
        receivedFriendRequests: {
          connect: {
            id: userId,
          },
        },
      },
    });

    pubsub.publish(Subscription.UserFriendRequestSent, user);
    pubsub.publish(Subscription.UserFriendRequestReceived, friend);

    return friend;
  },
});
