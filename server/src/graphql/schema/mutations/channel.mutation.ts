import {
  ApolloError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-core';
import {
  booleanArg,
  intArg,
  list,
  mutationField,
  nonNull,
  stringArg,
} from 'nexus';
import { ChannelEventPayload } from 'src/graphql/backing-types/channel-event-payload.interface';
import { Subscriptions } from '../../backing-types/subscriptions.enum';

export const createChannel = mutationField('createChannel', {
  type: 'Channel',
  args: {
    name: nonNull(
      stringArg({
        description: 'Name of the Channel',
      })
    ),
    description: stringArg({
      description: 'Description of Channel',
    }),
    isPrivate: booleanArg({
      description: 'If the Channel should be private',
      default: true,
    }),
    memberIds: list(
      nonNull(
        stringArg({
          description: 'Ids of Users to be added to Channel',
        })
      )
    ),
  },
  description: 'Create a Channel',
  resolve: async (
    _,
    { name, description, isPrivate, memberIds },
    { prisma, userId }
  ) => {
    // Remove duplicates
    const memberIdSet: Set<string> = new Set(memberIds);

    if (memberIdSet.has(userId)) {
      // Remove self from memberIdSet
      memberIdSet.delete(userId);
    }

    if (memberIdSet) {
      // Check that the user is friends with all of these users
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          friends: {
            where: {
              id: {
                in: memberIds,
              },
            },
          },
        },
      });

      if (!user) {
        throw new Error('Failed to find user');
      }

      if (user.friends.length != memberIdSet.size) {
        throw new ForbiddenError(
          'You are not friends with all of the users provided'
        );
      }
    }

    // add creator as members
    memberIdSet.add(userId);

    return await prisma.channel.create({
      data: {
        name,
        description,
        createdById: userId,
        isDM: false,
        isPrivate,
        members: {
          connect: [...memberIdSet].map((id) => ({ id })),
        },
      },
    });
  },
});

export const deleteChannel = mutationField('deleteChannel', {
  type: 'Boolean',
  args: {
    channelId: nonNull(
      stringArg({
        description: 'Id of Channel to be deleted',
      })
    ),
  },
  description: 'Delete a Channel',
  resolve: async (_, { channelId }, { prisma, userId }) => {
    const channel = await prisma.channel.findUnique({
      select: {
        createdById: true,
      },
      where: {
        id: channelId,
      },
    });

    if (channel == null) {
      throw new ApolloError('Channel does not exist');
    }

    if (channel.createdById != userId) {
      throw new ForbiddenError(
        'You do not have permission to delete this channel'
      );
    }

    await prisma.channel.delete({
      where: {
        id: channelId,
      },
    });
    return true;
  },
});

export const updateChannel = mutationField('updateChannel', {
  type: 'Channel',
  args: {
    channelId: nonNull(
      stringArg({
        description: 'Id of Channel to be updated',
      })
    ),
    name: stringArg({
      description: 'Name of Channel',
    }),
    description: stringArg({
      description: 'Description of Channel',
    }),
    isPrivate: booleanArg({
      description: 'If the Channel should be private',
    }),
    addMembersId: list(
      nonNull(
        stringArg({
          description: 'Ids of Users to be added to Channel',
        })
      )
    ),
    removeMembersId: list(
      nonNull(
        stringArg({
          description: 'Ids of Users to be removed from Channel',
        })
      )
    ),
  },
  description: 'Update a Channel',
  resolve: async (
    _,
    { channelId, name, description, isPrivate, addMembersId, removeMembersId },
    { prisma, userId, pubsub }
  ) => {
    const channel = await prisma.channel.findUnique({
      select: {
        createdById: true,
        members: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: channelId,
      },
    });

    if (channel == null) {
      throw new UserInputError(`Channel with id: ${channelId}, not found`);
    }

    if (channel.createdById != userId) {
      // Can only update your own channels
      throw new ForbiddenError(
        'You do not have permission to update this channel'
      );
    }

    const updatedChannel = await prisma.channel.update({
      data: {
        name,
        description,
        isPrivate,
        members: {
          connect: addMembersId?.map((x) => ({ id: x })),
          disconnect: removeMembersId?.map((x) => ({ id: x })),
        },
      },
      where: {
        id: channelId,
      },
    });

    if (addMembersId?.length > 0) {
      await pubsub.publish<ChannelEventPayload>(Subscriptions.CHANNEL_EVENT, {
        channelId,
        event: {
          __typename: 'MembersAdded',
          byUserId: userId,
          memberIds: addMembersId,
        },
      });
    }
    if (removeMembersId?.length > 0) {
      await pubsub.publish<ChannelEventPayload>(Subscriptions.CHANNEL_EVENT, {
        channelId,
        event: {
          __typename: 'MembersRemoved',
          byUserId: userId,
          memberIds: addMembersId,
        },
      });
    }

    return updatedChannel;
  },
});

export const createDM = mutationField('createDM', {
  type: 'Channel',
  description: 'Create Direct Message Channel',
  resolve: async (_, __, { prisma, userId }) => {
    return await prisma.channel.create({
      data: {
        name: null,
        createdById: userId,
        isDM: true,
        isPrivate: true,
        members: {
          connect: [
            {
              id: userId, // Add creator as member
            },
          ],
        },
      },
    });
  },
});

export const addMembersToChannel = mutationField('addMembersToChannel', {
  type: 'Channel',
  args: {
    channelId: nonNull(
      stringArg({
        description: 'Id of Channel to add Users to',
      })
    ),
    memberIds: nonNull(
      list(
        nonNull(
          stringArg({
            description: 'Ids of Users to be added to Channel',
          })
        )
      )
    ),
  },
  description: 'Add Members into Channel',
  resolve: async (_, { channelId, memberIds }, { prisma, userId }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        memberOfChannels: {
          where: {
            id: channelId,
          },
        },
        friends: {
          where: {
            id: {
              in: memberIds,
            },
          },
        },
      },
    });

    // You have to be a member to add members
    if (user.memberOfChannels.length == 0) {
      throw new ForbiddenError(
        'You do not have permission to add members to this channel'
      );
    }

    // You have to be friends with all of the user provided
    if (user.friends.length != memberIds.length) {
      throw new ForbiddenError('You are not friends with all of these users');
    }

    // Connect new members to channel
    return await prisma.channel.update({
      data: {
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
      where: {
        id: channelId,
      },
    });
  },
});

export const removeMembersFromChannel = mutationField(
  'removeMembersFromChannel',
  {
    type: 'Channel',
    args: {
      channelId: nonNull(stringArg()),
      membersIds: nonNull(list(nonNull(stringArg()))),
    },
    description: 'Remove Members from Channel',
    resolve: async (_, { channelId, membersIds }, { prisma, userId }) => {
      const members = await prisma.channel
        .findUnique({
          where: {
            id: channelId,
          },
        })
        .members();

      if (!members.find((member) => member.id == userId)) {
        throw new ForbiddenError(
          'You do not have permission to remove members from this channel'
        );
      }
      return await prisma.channel.update({
        data: {
          members: {
            disconnect: membersIds.map((id) => ({ id })),
          },
        },
        where: {
          id: channelId,
        },
      });
    },
  }
);
