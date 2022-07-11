import { ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg, list } from 'nexus';
import { Subscription } from '../../../backing-types';

export const addMembersToChat = mutationField('addMembersToChat', {
  type: 'Chat',
  args: {
    chatId: nonNull(
      stringArg({
        description: 'Id of Chat to add Users to',
      })
    ),
    memberIds: nonNull(
      list(
        nonNull(
          stringArg({
            description: 'Ids of Users to be added to Chat',
          })
        )
      )
    ),
  },
  description: 'Add Members into Chat',
  resolve: async (_, { chatId, memberIds }, { prisma, userId, pubsub }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        memberOfChats: {
          where: {
            id: chatId,
          },
        },
        friends: {
          where: {
            id: {
              in: memberIds,
            },
          },
        },
      },
    });

    // You have to be a member to add members
    if (user.memberOfChats.length == 0) {
      throw new ForbiddenError(
        'You do not have permission to add members to this chat'
      );
    }

    // You have to be friends with all of the user provided
    if (user.friends.length != memberIds.length) {
      throw new ForbiddenError('You are not friends with all of these users');
    }

    // Connect new members to chat
    const chat = await prisma.chat.update({
      data: {
        members: {
          connect: memberIds.map((id) => ({ id })),
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
        memberIdsAdded: memberIds,
      },
    });

    pubsub.publish(Subscription.ChatMembersAdded, update);

    return chat;
  },
});
