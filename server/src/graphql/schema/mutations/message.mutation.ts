import { intArg, mutationField, nonNull, stringArg } from 'nexus';
import { UserInputError, ForbiddenError } from 'apollo-server-errors';
import Message from '../types/message';
import { Subscriptions } from '../types/subscriptions';

export const createMessage = mutationField('createMessage', {
  type: Message,
  args: {
    channelId: nonNull(intArg()),
    content: nonNull(stringArg()),
  },
  description: 'Create a Message in a Channel',
  resolve: async (_, { channelId, content }, { prisma, pubsub, userId }) => {
    const members = await prisma.channel
      .findUnique({
        where: {
          id: channelId,
        },
      })
      .members();

    if (!members.find((member) => member.id == userId)) {
      throw new ForbiddenError('You are not a member of this channel');
    }

    const message = await prisma.message.create({
      data: {
        channelId,
        createdById: userId,
        content,
      },
    });

    pubsub.publish(Subscriptions.NEW_MESSAGE, {
      channelId,
      message,
    });

    return message;
  },
});

export const deleteMessage = mutationField('deleteMessage', {
  type: Message,
  args: {
    id: nonNull(intArg()),
  },
  description: 'Delete a Message',
  resolve: async (_, { id }, { prisma, userId }) => {
    // Can only delete own messages
    const message = await prisma.message.findUnique({
      select: {
        createdById: true,
      },
      where: {
        id: id,
      },
    });

    if (message == null) {
      throw new UserInputError(`Message with id: ${id}, not found`);
    }

    if (message.createdById) {
      // You can only delete your own messages
      throw new ForbiddenError(
        'You do not have permission to delete this message'
      );
    }

    return prisma.message.update({
      data: {
        deletedAt: Date.now().toString(),
      },
      where: {
        id,
      },
    });
  },
});

export const updateMessage = mutationField('updateMessage', {
  type: Message,
  args: {
    id: nonNull(intArg()),
    content: nonNull(stringArg()),
  },
  description: 'Update a Message',
  resolve: async (_, { id, content }, { prisma, userId }) => {
    const message = await prisma.message.findUnique({
      select: {
        createdById: true,
      },
      where: {
        id: id,
      },
    });

    if (message == null) {
      throw new UserInputError(`Message with id: ${id}, not found`);
    }

    if (message.createdById != userId) {
      // You can only update your own messages
      throw new ForbiddenError(
        'You do not have permission to update this message'
      );
    }

    // Update message
    return await prisma.message.update({
      data: {
        content,
      },
      where: {
        id,
      },
    });
  },
});
