import { mutationField, nonNull } from 'nexus';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';
import { CreateGroupChatInput, UpdateGroupChatInput } from './chat.input';

export const CreateGroupChatMutation = mutationField('createGroupChat', {
  type: 'GroupChat',
  args: { data: CreateGroupChatInput },
  description: 'Create a Chat',
  authorize: (_, { data: { memberIds } }, { auth }) =>
    auth.canCreateGroupChat(memberIds),
  resolve: async (
    _,
    { data: { name, description, memberIds } },
    { prisma, userId, pubsub }
  ) => {
    // Remove duplicates & creator as members
    const memberIdSet: Set<number> = new Set(memberIds);
    memberIdSet.add(userId);

    // Create the chat
    const chat = await prisma.chat.create({
      data: {
        name,
        description,
        createdById: userId,
        isDM: false,
        members: {
          connect: [...memberIdSet].map((id) => ({ id })),
        },
        // Add creator (current user) as admin
        admins: {
          connect: { id: userId },
        },
      },
      // Including member ids for pubsub
      include: {
        members: {
          select: {
            id: true,
          },
        },
      },
    });

    // Publish created chat
    await pubsub.publish(Subscription.ChatCreated, chat);

    return chat;
  },
});

export const CreateDirectMessageChatMutation = mutationField(
  'createDirectMessageChat',
  {
    type: 'DirectMessageChat',
    args: {
      friendId: nonNull(
        hashIdArg({
          description: 'Id of friend to create a Direct Message Chat with',
        })
      ),
    },
    description: 'Create a Chat',
    authorize: (_, { friendId }, { auth }) =>
      auth.canCreateDirectMessageChat(friendId),
    resolve: async (_, { friendId }, { prisma, userId, pubsub }) => {
      const chat = await prisma.chat.create({
        data: {
          name: `${userId}.${friendId}`,
          createdById: userId,
          isDM: true,
          members: {
            connect: [userId, friendId].map((id) => ({ id })),
          },
        },
        // Including member ids for pubsub
        include: {
          members: {
            select: {
              id: true,
            },
          },
        },
      });

      // Publish created chat
      await pubsub.publish(Subscription.ChatCreated, chat);

      return chat;
    },
  }
);

export const UpdateGroupChatMutation = mutationField('updateGroupChat', {
  type: 'GroupChat',
  args: { data: UpdateGroupChatInput },
  description: 'Update a Chat',
  authorize: (_, { data: { chatId, addMemberIds } }, { auth }) =>
    auth.canUpdateGroupChat(chatId, addMemberIds),
  resolve: async (
    _,
    { data: { chatId, name, description, addMemberIds, removeMemberIds } },
    { prisma, userId, pubsub }
  ) => {
    const updatedChat = await prisma.chat.update({
      data: {
        name,
        description,
        members: {
          connect: addMemberIds?.map((id) => ({ id })),
          disconnect: removeMemberIds?.map((id) => ({ id })),
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
      // Includeing member ids for pubsub
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

    // Publish update
    pubsub.publish(Subscription.ChatUpdated, update);

    return updatedChat;
  },
});

export const DeleteChatMutation = mutationField('deleteChat', {
  type: 'DeletedChat',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of Chat to be deleted',
      })
    ),
  },
  description: 'Delete a Chat',
  authorize: async (_, { chatId }, { auth }) =>
    await auth.canDeleteChat(chatId),
  resolve: async (_, { chatId }, { prisma, pubsub }) => {
    const chat = await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
      // Including member ids for pubsub
      include: {
        members: {
          select: {
            id: true,
          },
        },
      },
    });

    // Publish deleted chat
    await pubsub.publish(Subscription.ChatDeleted, chat);

    return chat;
  },
});
