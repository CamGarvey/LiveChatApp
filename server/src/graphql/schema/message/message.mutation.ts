import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../backing-types';

export const CreateMessageMutation = mutationField('createMessage', {
  type: 'Message',
  description: 'Create a Message in a Chat',
  args: {
    chatId: nonNull(
      stringArg({
        description: 'Id of Chat to create Message in',
      })
    ),
    content: nonNull(
      stringArg({
        description: 'Content of Message',
      })
    ),
  },
  resolve: async (_, { chatId, content }, { prisma, pubsub, userId }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        memberOfChats: {
          where: {
            id: chatId,
          },
        },
      },
    });

    if (!user.memberOfChats) {
      throw new ForbiddenError('You are not a member of this Chat');
    }

    const message = await prisma.message.create({
      data: {
        chatId,
        createdById: userId,
        content,
      },
    });

    pubsub.publish(Subscription.MessageCreated, message);

    return message;
  },
});

export const DeleteMessageMutation = mutationField('deleteMessage', {
  type: 'Message',
  args: {
    messageId: nonNull(
      stringArg({
        description: 'Id of Message to delete',
      })
    ),
  },
  description: 'Delete a Message',
  resolve: async (_, { messageId }, { prisma, userId, pubsub }) => {
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
    console.log({ message, userId });

    if (message.createdById != userId) {
      // You can only delete your own messages
      throw new ForbiddenError(
        'You do not have permission to delete this Message'
      );
    }

    const updatedMessage = prisma.message.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: messageId,
      },
    });

    pubsub.publish(Subscription.MessageDeleted, updatedMessage);

    return updatedMessage;
  },
});

export const UpdateMessageMutation = mutationField('updateMessage', {
  type: 'Message',
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
  description: 'Update a Message',
  resolve: async (_, { messageId, content }, { prisma, userId, pubsub }) => {
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
    const updatedMessage = await prisma.message.update({
      data: {
        content,
      },
      where: {
        id: messageId,
      },
    });

    pubsub.publish(Subscription.MessageUpdated, updatedMessage);

    return updatedMessage;
  },
});
