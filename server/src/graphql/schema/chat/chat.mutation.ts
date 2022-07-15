import {
  UserInputError,
  ForbiddenError,
  ApolloError,
} from 'apollo-server-core';
import { mutationField, nonNull, stringArg, list } from 'nexus';
import { Subscription } from '../../backing-types';
import { CreateGroupChatInput, UpdateChatInput } from './chat.input';

export const CreateGroupChatMutation = mutationField('createGroupChat', {
  type: 'GroupChat',
  args: { data: CreateGroupChatInput },
  description: 'Create a Chat',
  authorize: async (_, { data: { memberIds } }, { auth }) =>
    auth.canCreateGroupChat(memberIds),
  resolve: async (
    _,
    { data: { name, description, memberIds } },
    { prisma, userId, pubsub }
  ) => {
    // Remove duplicates & creator as members
    const memberIdSet: Set<string> = new Set(memberIds);
    memberIdSet.add(userId);

    const chat = await prisma.chat.create({
      data: {
        name,
        description,
        createdById: userId,
        isDM: false,
        members: {
          connect: [...memberIdSet].map((id) => ({ userId: id })),
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

export const CreateDirectMessageChatMutation = mutationField(
  'createDirectMessageChat',
  {
    type: 'DirectMessageChat',
    args: {
      friendId: nonNull(
        stringArg({
          description: 'Id of friend to create a Direct Message Chat with',
        })
      ),
    },
    description: 'Create a Chat',
    authorize: async (_, { friendId }, { auth }) =>
      await auth.canCreateDirectMessageChat(friendId),
    resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
      const chat = await prisma.chat.create({
        data: {
          name: `${userId}.${friendId}`,
          createdById: userId,
          isDM: true,
          members: {
            connect: [userId, friendId].map((id) => ({ userId: id })),
          },
        },
      });

      await pubsub.publish(Subscription.ChatCreated, chat);
      await pubsub.publish(Subscription.UserChatCreated, chat);

      return chat;
    },
  }
);

export const AddMembersToGroupChatMutation = mutationField(
  'addMembersToGroupChat',
  {
    type: 'ChatResult',
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
    authorize: (_, { chatId, memberIds }, { auth }) =>
      auth.canAddMembersToChat(chatId, memberIds),
    resolve: async (_, { chatId, memberIds }, { prisma, userId, pubsub }) => {
      // Connect new members to chat
      const chat = await prisma.chat.update({
        data: {
          members: {
            connect: memberIds.map((id) => ({ userId: id })),
          },
        },
        where: {
          chatId,
        },
      });

      const update = await prisma.chatUpdate.create({
        data: {
          chat: {
            connect: {
              chatId,
            },
          },
          createdBy: {
            connect: {
              userId,
            },
          },
          memberIdsAdded: memberIds,
        },
      });

      pubsub.publish(Subscription.ChatMembersAdded, update);

      return chat;
    },
  }
);

export const RemoveMembersFromGroupChatMutation = mutationField(
  'removeMembersFromChat',
  {
    type: 'ChatResult',
    args: {
      chatId: nonNull(stringArg()),
      membersIds: nonNull(list(nonNull(stringArg()))),
    },
    description: 'Remove Members from Chat',
    authorize: (_, { chatId }, { auth }) =>
      auth.canRemoveMembersFromChat(chatId),
    resolve: async (_, { chatId, membersIds }, { prisma, userId, pubsub }) => {
      const chat = await prisma.chat.update({
        data: {
          members: {
            disconnect: membersIds.map((id) => ({ userId: id })),
          },
        },
        where: {
          chatId,
        },
      });

      const update = await prisma.chatUpdate.create({
        data: {
          chat: {
            connect: {
              chatId,
            },
          },
          createdBy: {
            connect: {
              userId,
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
  type: 'ChatResult',
  args: { data: UpdateChatInput },
  description: 'Update a Chat',
  resolve: async (
    _,
    { data: { chatId, name, description, addMemberIds, removeMemberIds } },
    { prisma, userId, pubsub }
  ) => {
    const chat = await prisma.chat.findUnique({
      select: {
        createdById: true,
        members: {
          select: {
            userId: true,
          },
        },
      },
      where: {
        chatId,
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
        members: {
          connect: addMemberIds?.map((x) => ({ userId: x })),
          disconnect: removeMemberIds?.map((x) => ({ userId: x })),
        },
      },
      where: {
        chatId,
      },
    });

    const update = await prisma.chatUpdate.create({
      data: {
        chat: {
          connect: {
            chatId,
          },
        },
        createdBy: {
          connect: {
            userId,
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
                userId: true,
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
        chatId,
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
        chatId,
      },
    });

    await pubsub.publish(Subscription.ChatDeleted, chat);

    return chat;
  },
});
