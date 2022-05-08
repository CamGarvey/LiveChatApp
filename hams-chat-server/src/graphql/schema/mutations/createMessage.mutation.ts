import { intArg, mutationField, nonNull, stringArg } from 'nexus';
import Message from '../types/message';
import { Subscriptions } from '../types/subscriptions';

export const createMessage = mutationField('createMessage', {
  type: Message,
  args: {
    channelId: nonNull(intArg()),
    createdById: nonNull(intArg()),
    content: nonNull(stringArg()),
  },
  description: 'Create a Message in a Channel',
  resolve: async (
    _,
    { channelId, createdById, content },
    { prisma, pubsub }
  ) => {
    const message = await prisma.message.create({
      data: {
        content,
        channelId,
        createdById,
      },
    });

    pubsub.publish(Subscriptions.NEW_MESSAGE, {
      channelId,
      message,
    });

    return message;
  },
});
