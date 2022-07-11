import { ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg, list } from 'nexus';
import { Subscription } from '../../../backing-types';

export const removeMembersFromChat = mutationField('removeMembersFromChat', {
  type: 'Chat',
  args: {
    chatId: nonNull(stringArg()),
    membersIds: nonNull(list(nonNull(stringArg()))),
  },
  description: 'Remove Members from Chat',
  resolve: async (_, { chatId, membersIds }, { prisma, userId, pubsub }) => {
    const members = await prisma.chat
      .findUnique({
        where: {
          id: chatId,
        },
      })
      .members();

    if (!members.find((member) => member.id == userId)) {
      throw new ForbiddenError(
        'You do not have permission to remove members from this chat'
      );
    }

    const chat = await prisma.chat.update({
      data: {
        members: {
          disconnect: membersIds.map((id) => ({ id })),
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
        memberIdsRemoved: membersIds,
      },
    });

    pubsub.publish(Subscription.ChatMembersDeleted, update);

    return chat;
  },
});
