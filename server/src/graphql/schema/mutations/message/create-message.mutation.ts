import { ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import { Subscription } from '../../../backing-types';

export const createMessage = mutationField('createMessage', {
  type: 'Message',
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
  description: 'Create a Message in a Chat',
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
