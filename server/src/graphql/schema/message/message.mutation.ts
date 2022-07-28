import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';

export const CreateMessageMutation = mutationField('createMessage', {
  type: 'InstantMessage',
  description: 'Create a Message in a Chat',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of Chat to create Message in',
      })
    ),
    content: nonNull(
      stringArg({
        description: 'Content of Message',
      })
    ),
  },
  authorize: (_, { chatId }, { auth }) => auth.canCreateMessage(chatId),
  resolve: async (_, { chatId, content }, { prisma, pubsub, userId }) => {
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
  type: 'DeletedMessage',
  args: {
    messageId: nonNull(
      hashIdArg({
        description: 'Id of Message to delete',
      })
    ),
  },
  description: 'Delete a Message',
  authorize: (_, { messageId }, { auth }) => auth.canDeletedMessage(messageId),
  resolve: async (_, { messageId }, { prisma, pubsub }) => {
    const message = await prisma.message.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: messageId,
      },
    });

    pubsub.publish(Subscription.MessageDeleted, message);

    return message;
  },
});

export const UpdateMessageMutation = mutationField('updateMessage', {
  type: 'InstantMessage',
  args: {
    messageId: nonNull(
      hashIdArg({
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
  authorize: (_, { messageId }, { auth }) => auth.canUpdateMessage(messageId),
  resolve: async (_, { messageId, content }, { prisma, pubsub }) => {
    // Update message
    const message = await prisma.message.update({
      data: {
        content,
      },
      where: {
        id: messageId,
      },
    });

    pubsub.publish(Subscription.MessageUpdated, message);

    return message;
  },
});
