import { intArg, mutationField, nonNull } from 'nexus';
import { Subscriptions } from '../types/subscriptions';

export const sendFriendRequest = mutationField('sendFriendRequest', {
  type: 'Boolean',
  args: {
    userId: nonNull(intArg()),
    friendId: nonNull(intArg()),
  },
  description: 'Send a Friend Request to a User',
  resolve: async (_, { userId, friendId }, { prisma, pubsub }) => {
    // Validate
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        AND: [
          {
            // not already friends
            friends: {
              none: { id: friendId },
            },
            // no request sent
            sentFriendRequests: {
              none: { id: friendId },
            },
            // no request has been received
            receivedFriendRequests: {
              none: { id: friendId },
            },
          },
        ],
      },
    });

    if (user == null) {
      throw new Error(
        'User does not exists, already friends, request already sent or request already received'
      );
    }

    // Send request
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        sentFriendRequests: {
          connect: {
            id: friendId,
          },
        },
      },
    });

    // Publish new friend request
    pubsub.publish(Subscriptions.NEW_FRIEND_REQUEST, {
      receiverId: friendId,
      sender: user,
    });

    return true;
  },
});
