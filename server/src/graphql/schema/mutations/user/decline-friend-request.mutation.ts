import { ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../../backing-types';

export const declineFriendRequest = mutationField('declineFriendRequest', {
  type: 'Stranger',
  args: {
    friendId: nonNull(stringArg()),
  },
  description: 'Delete/Decline a received Friend Request',
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
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

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        receivedFriendRequests: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });

    pubsub.publish(Subscription.UserFriendRequestDeleted, user);
    pubsub.publish(Subscription.UserFriendRequestDeleted, friend);

    return friend;
  },
});
