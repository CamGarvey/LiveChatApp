import { mutationField, nonNull, stringArg } from 'nexus';
import { UserInputError, ForbiddenError } from 'apollo-server-errors';
import { Subscription } from '../../../backing-types';

export const updateMessage = mutationField('updateMessage', {
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
  description: 'Edit a Message',
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
