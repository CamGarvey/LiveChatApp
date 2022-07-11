import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from 'src/graphql/backing-types';

export const deleteMessage = mutationField('deleteMessage', {
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
