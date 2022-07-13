import {
  UserInputError,
  ForbiddenError,
  ApolloError,
} from 'apollo-server-core';
import { mutationField, nonNull, stringArg, list } from 'nexus';
import { Subscription } from '../../backing-types';
import { CreateChatInput, UpdateChatInput } from './chat.input';

export const CreateChatMutation = mutationField('createChat', {
  type: 'Chat',
  args: { data: CreateChatInput },
  description: 'Create a Chat',
  resolve: async (
    _,
    { data: { name, description, isPrivate, memberIds } },
    { prisma, userId, pubsub }
  ) => {
    // Remove duplicates
    const memberIdSet: Set<string> = new Set(memberIds);

    if (memberIdSet.has(userId)) {
      // Remove self from memberIdSet
      memberIdSet.delete(userId);
    }

    if (memberIdSet) {
      // Check that the user is friends with all of these users
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          friends: {
            where: {
              id: {
                in: memberIds,
              },
            },
          },
        },
      });

      if (!user) {
        throw new Error('Failed to find user');
      }

      if (user.friends.length != memberIdSet.size) {
        throw new ForbiddenError(
          'You are not friends with all of the users provided'
        );
      }
    }

    // add creator as members
    memberIdSet.add(userId);

    const chat = await prisma.chat.create({
      data: {
        name,
        description,
        createdById: userId,
        isDM: false,
        isPrivate,
        members: {
          connect: [...memberIdSet].map((id) => ({ id })),
        },
      },
      // include: {
      //   members: {
      //     select: {
      //       id: true, // selecting member ids for pubsub
      //     },
      //   },
      // },
    });

    await pubsub.publish(Subscription.ChatCreated, chat);
    await pubsub.publish(Subscription.UserChatCreated, chat);

    return chat;
  },
});

export const AddMembersToChatMutation = mutationField('addMembersToChat', {
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

export const RemoveMembersFromChatMutation = mutationField(
  'removeMembersFromChat',
  {
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
  }
);

export const UpdateChatMutation = mutationField('updateChat', {
  type: 'Chat',
  args: { data: UpdateChatInput },
  description: 'Update a Chat',
  resolve: async (
    _,
    {
      data: {
        chatId,
        name,
        description,
        isPrivate,
        addMemberIds,
        removeMemberIds,
      },
    },
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
          connect: addMemberIds?.map((x) => ({ id: x })),
          disconnect: removeMemberIds?.map((x) => ({ id: x })),
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
        memberIdsAdded: addMemberIds,
        memberIdsRemoved: removeMemberIds,
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

export const DeleteChatMutation = mutationField('deleteChat', {
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
