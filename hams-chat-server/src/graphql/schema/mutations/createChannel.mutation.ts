import { booleanArg, intArg, mutationField, nonNull, stringArg } from 'nexus';
import Channel from '../types/channel';

export const createChannel = mutationField('createChannel', {
  type: Channel,
  args: {
    name: nonNull(stringArg()),
    createdById: nonNull(intArg()),
    isDM: nonNull(booleanArg()),
  },
  description: 'Create a Channel',
  resolve(_, { name, createdById, isDM }, { prisma }) {
    return prisma.channel.create({
      data: {
        name,
        createdById,
        isDM,
        members: {
          connect: {
            id: createdById,
          },
        },
      },
    });
  },
});
