import { Event } from '@prisma/client';
import { mutationField, nonNull, stringArg } from 'nexus';
import SubscriptionPayload from 'src/graphql/backing-types/subscription-payload';
import { Subscription } from '../../../backing-types';
import { hashIdArg } from '../../shared';

export const CreateMessageMutation = mutationField('createMessage', {
  type: 'Message',
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
  authorize: (_, { chatId }, { auth }) => auth.canCreateEvent(chatId),
  resolve: async (_, { chatId, content }, { prisma, pubsub, userId }) => {
    const event = await prisma.event.create({
      data: {
        chatId,
        createdById: userId,
        type: 'Message',
        message: {
          create: {
            content,
          },
        },
      },
      include: {
        message: {
          select: {
            content: true,
          },
        },
        chat: {
          select: {
            members: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    pubsub.publish<SubscriptionPayload<Event>>(Subscription.MessageCreated, {
      recipients: event.chat.members
        .map((x) => x.id)
        .filter((x) => x !== userId),
      content: event,
    });

    return event;
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
  authorize: (_, { messageId }, { auth }) => auth.canDeletedEvent(messageId),
  resolve: async (_, { messageId }, { prisma, pubsub, userId }) => {
    const event = await prisma.event.update({
      data: {
        deletedAt: new Date(),
      },
      include: {
        chat: {
          select: {
            members: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      where: {
        id: messageId,
      },
    });

    pubsub.publish<SubscriptionPayload<Event>>(Subscription.MessageDeleted, {
      recipients: event.chat.members
        .map((x) => x.id)
        .filter((x) => x !== userId),
      content: event,
    });

    return event;
  },
});

export const UpdateMessageMutation = mutationField('updateMessage', {
  type: 'Message',
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
  authorize: (_, { messageId }, { auth }) => auth.canUpdateEvent(messageId),
  resolve: async (_, { messageId, content }, { prisma, pubsub, userId }) => {
    // Update message
    const message = await prisma.message.update({
      data: {
        content,
      },
      include: {
        event: {
          include: {
            chat: {
              select: {
                members: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        eventId: messageId,
      },
    });

    pubsub.publish<SubscriptionPayload<Event>>(Subscription.MessageUpdated, {
      recipients: message.event.chat.members
        .map((x) => x.id)
        .filter((x) => x !== userId),
      content: message.event,
    });

    return message.event;
  },
});
