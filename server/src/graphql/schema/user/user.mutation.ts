import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../backing-types';

export const UpdateMeMutation = mutationField('updateMe', {
  type: 'Me',
  description: 'Update current user',
  args: {
    email: nonNull(stringArg()),
    username: nonNull(stringArg()),
  },
  resolve(_, { email, username }, { userId, prisma }) {
    return prisma.user.update({
      data: {
        email,
        username,
      },
      where: {
        userId,
      },
    });
  },
});

export const SendFriendRequestMutation = mutationField('sendFriendRequest', {
  type: 'Stranger',
  description: 'Send a friend request to a user',
  args: {
    friendId: nonNull(stringArg()),
  },
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        friends: {
          where: {
            userId: friendId,
          },
        },
        sentFriendRequests: {
          where: {
            userId: friendId,
          },
        },
        receivedFriendRequests: {
          where: {
            userId: friendId,
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
        userId: friendId,
      },
      data: {
        receivedFriendRequests: {
          connect: {
            userId,
          },
        },
      },
    });

    pubsub.publish(Subscription.UserFriendRequestSent, user);
    pubsub.publish(Subscription.UserFriendRequestReceived, friend);

    return friend;
  },
});

export const CancelFriendRequestMutation = mutationField(
  'cancelFriendRequest',
  {
    type: 'Stranger',
    description: 'Cancel/Delete a sent Friend Request',
    args: {
      friendId: nonNull(stringArg()),
    },
    resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
      const sentRequests = await prisma.user
        .findUnique({
          where: {
            userId,
          },
        })
        .sentFriendRequests();

      const friend = sentRequests.find((request) => request.userId == friendId);

      if (!friend) {
        throw new ForbiddenError('You have no sent requests to this user');
      }

      const user = await prisma.user.update({
        where: {
          userId,
        },
        data: {
          sentFriendRequests: {
            disconnect: {
              userId: friendId,
            },
          },
        },
      });

      pubsub.publish(Subscription.UserFriendRequestDeleted, user);
      pubsub.publish(Subscription.UserFriendRequestDeleted, friend);

      return friend;
    },
  }
);

export const DeclineFriendRequestMutation = mutationField(
  'declineFriendRequest',
  {
    type: 'Stranger',
    description: 'Delete/Decline a received Friend Request',
    args: {
      friendId: nonNull(stringArg()),
    },
    resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
      const receivedRequests = await prisma.user
        .findUnique({
          where: {
            userId,
          },
        })
        .receivedFriendRequests();

      const friend = receivedRequests.find(
        (request) => request.userId == friendId
      );

      if (!friend) {
        throw new ForbiddenError('You do not have a request from this user');
      }

      const user = await prisma.user.update({
        where: {
          userId,
        },
        data: {
          receivedFriendRequests: {
            disconnect: {
              userId: friendId,
            },
          },
        },
      });

      pubsub.publish(Subscription.UserFriendRequestDeleted, user);
      pubsub.publish(Subscription.UserFriendRequestDeleted, friend);

      return friend;
    },
  }
);

export const AcceptFriendRequestMutation = mutationField(
  'acceptFriendRequest',
  {
    type: 'Friend',
    description: 'Accept a Users friend request',
    args: {
      friendId: nonNull(stringArg()),
    },
    resolve: async (_, { friendId }, { prisma, pubsub, userId }) => {
      const receivedRequests = await prisma.user
        .findUnique({
          where: {
            userId,
          },
        })
        .receivedFriendRequests();

      const friend = receivedRequests.find(
        (request) => request.userId == friendId
      );

      if (!friend) {
        throw new ForbiddenError('You do not have a request from this user');
      }

      // Accept request
      const user = await prisma.user.update({
        where: {
          userId,
        },
        data: {
          receivedFriendRequests: {
            // Remove received request
            disconnect: {
              userId: friendId,
            },
          },
          friends: {
            // And add as friend
            connect: {
              userId: friendId,
            },
          },
          friendsOf: {
            connect: {
              userId: friendId,
            },
          },
        },
      });

      pubsub.publish(Subscription.UserFriendCreated, user);
      pubsub.publish(Subscription.UserFriendCreated, friend);

      return friend;
    },
  }
);

export const DeleteFriendMutation = mutationField('deleteFriend', {
  type: 'Stranger',
  description: 'Delete a Friend',
  args: {
    friendId: nonNull(stringArg()),
  },
  resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
    // Validate
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        friends: {
          where: {
            userId: friendId,
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
    const newUser = await prisma.user.update({
      where: {
        userId,
      },
      data: {
        friends: {
          disconnect: {
            userId: friendId,
          },
        },
        friendsOf: {
          disconnect: {
            userId: friendId,
          },
        },
      },
    });

    pubsub.publish(Subscription.UserFriendDeleted, user);
    pubsub.publish(Subscription.UserFriendDeleted, { id: friendId });

    return newUser;
  },
});
