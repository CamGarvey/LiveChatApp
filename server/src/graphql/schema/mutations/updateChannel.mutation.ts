import {
  booleanArg,
  intArg,
  list,
  mutationField,
  nonNull,
  stringArg,
} from 'nexus';
import Channel from '../types/channel';

export const updateChannel = mutationField('updateChannel', {
  type: Channel,
  args: {
    id: nonNull(intArg()),
    isDM: nonNull(booleanArg()),
    name: nonNull(stringArg()),
  },
  description: 'Update a Channel',
  resolve(_, { id, name, isDM }, ctx) {
    return ctx.prisma.channel.update({
      data: {
        name,
        isDM,
      },
      where: {
        id,
      },
    });
  },
});

export const addUsersToChannel = mutationField('addUsersToChannel', {
  type: Channel,
  args: {
    id: nonNull(intArg()),
    userIds: nonNull(list(nonNull(intArg()))),
  },
  description: 'Add Users into Channel',
  resolve(_, { id, userIds }, { prisma }) {
    return prisma.channel.update({
      data: {
        members: {
          connect: userIds.map((userId) => ({ id: userId })),
        },
      },
      where: {
        id,
      },
    });
  },
});

export const removeUsersFromChannel = mutationField('removeUsersFromChannel', {
  type: Channel,
  args: {
    id: nonNull(intArg()),
    userIds: nonNull(list(nonNull(intArg()))),
  },
  description: 'Remove Users from Channel',
  resolve(_, { id, userIds }, { prisma }) {
    return prisma.channel.update({
      data: {
        members: {
          disconnect: userIds.map((userId) => ({ id: userId })),
        },
      },
      where: {
        id,
      },
    });
  },
});
