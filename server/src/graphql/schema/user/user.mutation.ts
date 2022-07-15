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
        id: userId,
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
    const newUser = await prisma.user.update({
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

    pubsub.publish(Subscription.UserFriendDeleted, user);
    pubsub.publish(Subscription.UserFriendDeleted, { id: friendId });

    return newUser;
  },
});
