import { Event } from '@prisma/client';
import { mutationField } from 'nexus';
import { Subscription, SubscriptionPayload } from '../../backing-types';
import { hashIdArg } from '../shared';

export const DeleteEventMutation = mutationField('deleteEvent', {
  type: 'DeletedEvent',
  args: {
    eventId: hashIdArg({
      description: 'Id of event',
    }),
  },
  authorize: (_, { eventId }, { auth }) => auth.canDeletedEvent(eventId),
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

    pubsub.publish<SubscriptionPayload<Event>>(Subscription.EventDeleted, {
      recipients: event.chat.members
        .map((x) => x.id)
        .filter((x) => x !== userId),
      content: event,
    });

    return event;
  },
});
