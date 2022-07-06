import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../backing-types/subscriptions.enum';

export const updateUser = mutationField('updateUser', {
  type: 'User',
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
  type: 'User',
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

    // Publish new friend request
    pubsub.publish(Subscription.FriendRequestCreated, {
      sender: user,
      receiverId: friendId,
    });
    // Publish me changed for the friend
    pubsub.publish(Subscription.MeChanged, friend);

    return friend;
  },
});

export const cancelFriendRequest = mutationField('cancelFriendRequest', {
  type: 'User',
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

    // Publish new deleted friend request
    pubsub.publish(Subscription.FriendRequestDeleted, {
      sender: user,
      receiverId: friendId,
    });
    // Publish me changed for the friend
    pubsub.publish(Subscription.MeChanged, friend);

    return friend;
  },
});

export const acceptFriendRequest = mutationField('acceptFriendRequest', {
  type: 'User',
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
      },
    });

    // Publish new friend
    pubsub.publish(Subscription.FriendCreated, {
      senderId: friendId,
      receiver: user,
    });

    return friend;
  },
});

export const declineFriendRequest = mutationField('declineFriendRequest', {
  type: 'User',
  args: {
    friendId: nonNull(stringArg()),
  },
  description: 'Delete/Decline a received Friend Request',
  resolve: async (_, { friendId }, { prisma, userId }) => {
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
    return friend;
  },
});

export const deleteFriend = mutationField('deleteFriend', {
  type: 'User',
  args: {
    friendId: nonNull(stringArg()),
  },
  description: 'Delete a Friend',
  resolve: async (_, { friendId }, { prisma, userId }) => {
    // Validate
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
      },
    });

    if (user == null) {
      throw new Error('User does not exist');
    }

    if (user.friends.length == 0) {
      throw new Error('You are not friends with this user');
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

    return user.friends[0];
  },
});
