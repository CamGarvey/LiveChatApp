import { ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../../backing-types';

export const cancelFriendRequest = mutationField('cancelFriendRequest', {
  type: 'Stranger',
  args: {
    friendId: nonNull(stringArg()),
  },
  description: 'Cancel/Delete a sent Friend Request',
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    const sentRequests = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .sentFriendRequests();

    const friend = sentRequests.find((request) => request.id == friendId);

    if (!friend) {
      throw new ForbiddenError('You have no sent requests to this user');
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        sentFriendRequests: {
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
