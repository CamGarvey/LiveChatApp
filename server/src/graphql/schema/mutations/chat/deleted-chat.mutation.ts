import { ApolloError, ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../../backing-types';

export const deleteChat = mutationField('deleteChat', {
  type: 'DeletedChat',
  args: {
    chatId: nonNull(
      stringArg({
        description: 'Id of Chat to be deleted',
      })
    ),
  },
  description: 'Delete a Chat',
  resolve: async (_, { chatId }, { prisma, userId, pubsub }) => {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (chat == null) {
      throw new ApolloError('Chat does not exist');
    }

    if (chat.createdById != userId) {
      throw new ForbiddenError(
        'You do not have permission to delete this chat'
      );
    }

    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    await pubsub.publish(Subscription.ChatDeleted, chat);

    return chat;
  },
});
