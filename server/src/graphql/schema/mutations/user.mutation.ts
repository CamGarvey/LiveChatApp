import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg, intArg } from 'nexus';
import { Subscriptions } from '../types/subscriptions';
import User from '../types/user';

export const updateUser = mutationField('updateUser', {
  type: User,
  args: {
    email: nonNull(stringArg()),
    username: nonNull(stringArg()),
  },
  description: 'Update current User',
  resolve(_, { email, username }, { userId, prisma }) {
    return prisma.user.update({
      data: {
        email,
        username,
      },
      where: {
        id: userId,
      },
    });
  },
});

export const sendFriendRequest = mutationField('sendFriendRequest', {
  type: 'Boolean',
  args: {
    friendId: nonNull(intArg()),
  },
  description: 'Send a Friend Request to a User',
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
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
      throw new UserInputError(
        'User does not exist, already friends, request already sent or request already received'
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

export const cancelFriendRequest = mutationField('cancelFriendRequest', {
  type: 'Boolean',
  args: {
    friendId: nonNull(intArg()),
  },
  description: 'Cancel/Delete a sent Friend Request',
  resolve: async (_, { friendId }, { prisma, userId }) => {
    await prisma.user.update({
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
    return true;
  },
});

export const acceptFriendRequest = mutationField('acceptFriendRequest', {
  type: 'Boolean',
  args: {
    friendId: nonNull(intArg()),
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

    if (!receivedRequests.find((request) => request.id == friendId)) {
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

export const declineFriendRequest = mutationField('declineFriendRequest', {
  type: 'Boolean',
  args: {
    friendId: nonNull(intArg()),
  },
  description: 'Delete/Decline a received Friend Request',
  resolve: async (_, { friendId }, { prisma, userId }) => {
    await prisma.user.update({
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
    return true;
  },
});

export const deleteFriend = mutationField('deleteFriend', {
  type: 'Boolean',
  args: {
    friendId: nonNull(intArg()),
  },
  description: 'Delete a Friend',
  resolve: async (_, { friendId }, { prisma, userId }) => {
    // Validate
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        AND: [
          {
            // is friend
            friends: {
              some: { id: friendId },
            },
          },
        ],
      },
    });

    if (user == null) {
      throw new Error('User does not exist or not friends');
    }

    // Delete user
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          disconnect: {
            id: friendId,
          },
        },
        friendsOf: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });

    return true;
  },
});
