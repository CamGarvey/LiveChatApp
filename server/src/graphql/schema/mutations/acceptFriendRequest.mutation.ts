import { intArg, mutationField, nonNull } from 'nexus';
import { Subscriptions } from '../types/subscriptions';

export const acceptFriendRequest = mutationField('acceptFriendRequest', {
  type: 'Boolean',
  args: {
    userId: nonNull(intArg()),
    friendId: nonNull(intArg()),
  },
  description: 'Accept a Users friend request',
  resolve: async (_, { userId, friendId }, { prisma, pubsub }) => {
    // Validate
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        AND: [
          {
            // not already friends
            friends: {
              none: {
                id: friendId,
              },
            },
            // request has been received
            receivedFriendRequests: {
              some: {
                id: friendId,
              },
            },
          },
        ],
      },
    });

    if (user == null) {
      throw new Error(
        'User does not exists, already friends or no friend request received'
      );
    }

    // Accept request
    await prisma.user.update({
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
          // And add as buddy
          connect: {
            id: friendId,
          },
        },
      },
    });

    // Publish new friend
    pubsub.publish(Subscriptions.NEW_FRIEND, {
      senderId: friendId,
      receiver: user,
    });

    return true;
  },
});
