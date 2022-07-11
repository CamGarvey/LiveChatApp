import { UserInputError, ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg, booleanArg, list } from 'nexus';
import { Subscription } from '../../../backing-types';

export const updateChat = mutationField('updateChat', {
  type: 'Chat',
  args: {
    chatId: nonNull(
      stringArg({
        description: 'Id of Chat to be updated',
      })
    ),
    name: stringArg({
      description: 'Name of Chat',
    }),
    description: stringArg({
      description: 'Description of Chat',
    }),
    isPrivate: booleanArg({
      description: 'If the Chat should be private',
    }),
    addMembersId: list(
      nonNull(
        stringArg({
          description: 'Ids of Users to be added to Chat',
        })
      )
    ),
    removeMembersId: list(
      nonNull(
        stringArg({
          description: 'Ids of Users to be removed from Chat',
        })
      )
    ),
  },
  description: 'Update a Chat',
  resolve: async (
    _,
    { chatId, name, description, isPrivate, addMembersId, removeMembersId },
    { prisma, userId, pubsub }
  ) => {
    const chat = await prisma.chat.findUnique({
      select: {
        createdById: true,
        members: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: chatId,
      },
    });

    if (chat == null) {
      throw new UserInputError(`Chat with id: ${chatId}, not found`);
    }

    if (chat.createdById != userId) {
      // Can only update your own chats
      throw new ForbiddenError(
        'You do not have permission to update this chat'
      );
    }

    const updatedChat = await prisma.chat.update({
      data: {
        name,
        description,
        isPrivate,
        members: {
          connect: addMembersId?.map((x) => ({ id: x })),
          disconnect: removeMembersId?.map((x) => ({ id: x })),
        },
      },
      where: {
        id: chatId,
      },
    });

    const update = await prisma.chatUpdate.create({
      data: {
        chat: {
          connect: {
            id: chatId,
          },
        },
        createdBy: {
          connect: {
            id: userId,
          },
        },
        name,
        description,
        memberIdsAdded: addMembersId,
        memberIdsRemoved: removeMembersId,
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
    });

    pubsub.publish(Subscription.ChatUpdated, update);

    return updatedChat;
  },
});
