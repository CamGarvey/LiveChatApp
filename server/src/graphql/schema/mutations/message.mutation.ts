import { intArg, mutationField, nonNull, stringArg } from 'nexus';
import { UserInputError, ForbiddenError } from 'apollo-server-errors';
import Message from '../types/message';
import { Subscriptions } from '../types/subscriptions';

export const createMessage = mutationField('createMessage', {
  type: Message,
  args: {
    channelId: nonNull(
      stringArg({
        description: 'Id of Channel to create Message in',
      })
    ),
    content: nonNull(
      stringArg({
        description: 'Content of Message',
      })
    ),
  },
  description: 'Create a Message in a Channel',
  resolve: async (_, { channelId, content }, { prisma, pubsub, userId }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        memberOfChannels: {
          where: {
            id: channelId,
          },
        },
      },
    });

    if (!user.memberOfChannels) {
      throw new ForbiddenError('You are not a member of this Channel');
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
    messageId: nonNull(
      stringArg({
        description: 'Id of Message to delete',
      })
    ),
  },
  description: 'Delete a Message',
  resolve: async (_, { messageId }, { prisma, userId }) => {
    // Can only delete own messages
    const message = await prisma.message.findUnique({
      select: {
        createdById: true,
      },
      where: {
        id: messageId,
      },
    });

    if (message == null) {
      throw new UserInputError(`Message with id: ${messageId}, not found`);
    }

    if (message.createdById != userId) {
      // You can only delete your own messages
      throw new ForbiddenError(
        'You do not have permission to delete this Message'
      );
    }

    return prisma.message.update({
      data: {
        deletedAt: Date.now().toString(),
      },
      where: {
        id: messageId,
      },
    });
  },
});

export const editMessage = mutationField('editMessage', {
  type: Message,
  args: {
    messageId: nonNull(
      stringArg({
        description: 'Id of Message to edit',
      })
    ),
    content: nonNull(
      stringArg({
        description: 'New content for Message',
      })
    ),
  },
  description: 'Edit a Message',
  resolve: async (_, { messageId, content }, { prisma, userId }) => {
    const message = await prisma.message.findUnique({
      select: {
        createdById: true,
      },
      where: {
        id: messageId,
      },
    });

    if (message == null) {
      throw new UserInputError(`Message with id: ${messageId}, not found`);
    }

    if (message.createdById != userId) {
      // You can only update your own messages
      throw new ForbiddenError(
        'You do not have permission to edit this Message'
      );
    }

    // Update message
    return await prisma.message.update({
      data: {
        content,
      },
      where: {
        id: messageId,
      },
    });
  },
});
