import { mutationField } from 'nexus';
import { Subscription, EventPayload } from '../../backing-types';
import { hashIdArg } from '../shared';

export const DeleteEventMutation = mutationField('deleteEvent', {
  type: 'DeletedEvent',
  description: 'A deleted event',
  args: {
    eventId: hashIdArg({
      description: 'Id of event',
    }),
  },
  authorize: (_, { eventId }, { auth }) => auth.canDeletedEvent(eventId),
  resolve: async (_, { eventId }, { prisma, pubsub, currentUserId }) => {
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
        id: eventId,
      },
    });

    pubsub.publish<EventPayload>(Subscription.EventDeleted, {
      recipients: event.chat.members
        .map((x) => x.id)
        .filter((x) => x !== currentUserId),
      content: event,
    });

    return event;
  },
});
