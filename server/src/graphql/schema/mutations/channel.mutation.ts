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
import Channel from '../types/channel';

export const createChannel = mutationField('createChannel', {
  type: Channel,
  args: {
    name: nonNull(stringArg()),
    isPrivate: nonNull(booleanArg()),
  },
  description: 'Create a Channel',
  resolve: async (_, { name, isPrivate }, { prisma, userId }) => {
    return await prisma.channel.create({
      data: {
        name,
        createdById: userId,
        isDM: false,
        isPrivate,
        members: {
          connect: {
            id: userId, // Add creator as member
          },
        },
      },
    });
  },
});

export const deleteChannel = mutationField('deleteChannel', {
  type: 'Boolean',
  args: {
    id: nonNull(intArg()),
  },
  description: 'Delete a Channel',
  resolve: async (_, { id }, { prisma, userId }) => {
    const channel = await prisma.channel.findUnique({
      select: {
        createdById: true,
      },
      where: {
        id: id,
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
        id,
      },
    });
    return true;
  },
});

export const updateChannel = mutationField('updateChannel', {
  type: Channel,
  args: {
    id: nonNull(intArg()),
    name: stringArg(),
    isPrivate: booleanArg(),
  },
  description: 'Update a Channel',
  resolve: async (_, { id, name, isPrivate }, { prisma, userId }) => {
    const channel = await prisma.channel.findUnique({
      select: {
        createdById: true,
      },
      where: {
        id: id,
      },
    });

    if (channel == null) {
      throw new UserInputError(`Channel with id: ${id}, not found`);
    }

    if (channel.createdById != userId) {
      // Can only update your own channels
      throw new ForbiddenError(
        'You do not have permission to update this channel'
      );
    }

    return prisma.channel.update({
      data: {
        name,
        isPrivate,
      },
      where: {
        id,
      },
    });
  },
});

export const createDM = mutationField('createDM', {
  type: Channel,
  args: {
    friendId: nonNull(intArg()),
  },
  description: 'Create Direct Message Channel',
  resolve: async (_, { friendId }, { prisma, userId }) => {
    const friends = await prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .friends();

    if (!friends.find((friend) => friend.id == friendId)) {
      throw new ForbiddenError('You are not friends with this user');
    }

    const existing = await prisma.channel.findFirst({
      where: {
        isDM: true,
        members: {
          every: {
            AND: [
              {
                id: userId,
              },
              {
                id: friendId,
              },
            ],
          },
        },
      },
    });

    return existing == null
      ? await prisma.channel.create({
          data: {
            name: 'DM',
            createdById: userId,
            isDM: true,
            isPrivate: true,
            members: {
              connect: [
                {
                  id: userId, // Add creator as member
                },
                {
                  id: friendId, // Add friend as member
                },
              ],
            },
          },
        })
      : existing;
  },
});

export const addMembersToChannel = mutationField('addMembersToChannel', {
  type: Channel,
  args: {
    channelId: nonNull(intArg()),
    memberIds: nonNull(list(nonNull(intArg()))),
  },
  description: 'Add Members into Channel',
  resolve: async (_, { channelId, memberIds }, { prisma, userId }) => {
    const members = await prisma.channel
      .findUnique({
        where: {
          id: channelId,
        },
      })
      .members();

    if (!members.find((member) => member.id == userId)) {
      throw new ForbiddenError(
        'You do not have permission to add members to this channel'
      );
    }

    return prisma.channel.update({
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
    type: Channel,
    args: {
      channelId: nonNull(intArg()),
      membersIds: nonNull(list(nonNull(intArg()))),
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
