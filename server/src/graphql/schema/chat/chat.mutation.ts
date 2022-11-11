import { ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg } from 'nexus';
import {
  EventPayload,
  NotificationPayload,
  Subscription,
} from '../../backing-types';
import { hashIdArg } from '../shared';
import { CreateGroupChatInput } from './chat.input';

export const CreateGroupChatMutation = mutationField('createGroupChat', {
  type: 'GroupChat',
  description: 'Create a group chat',
  args: { data: nonNull(CreateGroupChatInput) },
  authorize: (_, { data: { memberIds } }, { auth }) =>
    auth.canCreateGroupChat(memberIds ?? []),
  resolve: async (
    _,
    { data: { name, description, memberIds } },
    { prisma, currentUserId, pubsub }
  ) => {
    // Remove duplicates & creator as members
    const memberIdSet: Set<number> = new Set(memberIds);
    memberIdSet.add(currentUserId);

    // Create the chat
    const chat = await prisma.chat.create({
      data: {
        type: 'GROUP',
        name,
        description,
        createdById: currentUserId,
        members: {
          createMany: {
            // Creating members
            // Creator has an ADMIN role, all other users have a STANDARD role
            data: [...memberIdSet].map((id) => ({
              userId: id,
              role: id == currentUserId ? 'OWNER' : 'BASIC',
              addedById: currentUserId,
            })),
          },
        },
      },
    });

    // Create an alert for members
    const alert = await prisma.alert.create({
      data: {
        type: 'CHAT_ACCESS_GRANTED',
        chat: {
          connect: {
            id: chat.id,
          },
        },
        recipients: {
          connect: [...memberIdSet]
            .filter((id) => id !== currentUserId)
            .map((id) => ({ id })),
        },
        createdBy: {
          connect: {
            id: currentUserId,
          },
        },
      },
    });

    // Publish alert to members
    await pubsub.publish<NotificationPayload>(
      Subscription.ChatMemberAccessGrantedAlert,
      {
        recipients: [...memberIdSet].filter((id) => id !== currentUserId),
        content: alert,
      }
    );

    return chat;
  },
});

export const CreateDirectMessageChatMutation = mutationField(
  'createDirectMessageChat',
  {
    type: 'DirectMessageChat',
    description: 'Create a direct message chat',
    args: {
      friendId: nonNull(
        hashIdArg({
          description: 'Id of friend to create a Direct Message Chat with',
        })
      ),
    },
    authorize: (_, { friendId }, { auth }) =>
      auth.canCreateDirectMessageChat(friendId),
    resolve: async (_, { friendId }, { prisma, currentUserId, pubsub }) => {
      const existingChat = await prisma.chat.findFirst({
        where: {
          type: 'DIRECT_MESSAGE',
          members: {
            every: {
              userId: {
                in: [friendId, currentUserId],
              },
            },
          },
        },
      });

      if (existingChat !== null) {
        // No need to create one
        return existingChat;
      }

      // Create new direct message chat
      const chat = await prisma.chat.create({
        data: {
          type: 'DIRECT_MESSAGE',
          name: `${currentUserId}.${friendId}`,
          createdById: currentUserId,
          members: {
            createMany: {
              // Creating members
              // Both users have ADMIN roles
              data: [currentUserId, friendId].map((id) => ({
                userId: id,
                role: 'ADMIN',
                addedById: currentUserId,
              })),
            },
          },
        },
      });

      // Create an alert for members
      const alert = await prisma.alert.create({
        data: {
          type: 'CHAT_ACCESS_GRANTED',
          chat: {
            connect: {
              id: chat.id,
            },
          },
          recipients: {
            connect: {
              id: friendId,
            },
          },
          createdBy: {
            connect: {
              id: currentUserId,
            },
          },
        },
      });

      await pubsub.publish<NotificationPayload>(
        Subscription.ChatMemberAccessGrantedAlert,
        {
          recipients: [currentUserId],
          content: alert,
        }
      );

      return chat;
    },
  }
);

export const UpdateGroupChatName = mutationField('updateGroupChatName', {
  type: 'NameUpdatedEvent',
  description: 'Update the name of group chat',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of chat to update',
      })
    ),
    name: nonNull(
      stringArg({
        description: 'New name',
      })
    ),
  },
  authorize: (_, { chatId }, { auth }) =>
    auth.canUpdateGroupChatBasic({ chatId }),
  resolve: async (_, { chatId, name }, { currentUserId, prisma, pubsub }) => {
    const chatBeforeUpdate = await prisma.chat.findUniqueOrThrow({
      where: {
        id: chatId,
      },
      select: {
        name: true,
      },
    });

    if (name === chatBeforeUpdate.name) {
      throw new ForbiddenError('Name has not changed');
    }

    const chatAfterUpdate = await prisma.chat.update({
      data: {
        name,
      },
      include: {
        members: {
          select: {
            userId: true,
          },
        },
      },
      where: {
        id: chatId,
      },
    });

    const event = await prisma.event.create({
      data: {
        type: 'CHAT_UPDATE',
        chat: {
          connect: {
            id: chatId,
          },
        },
        createdBy: {
          connect: {
            id: currentUserId,
          },
        },
        chatUpdate: {
          create: {
            type: 'NAME_UPDATED',
            nameBefore: chatBeforeUpdate.name,
            nameAfter: chatAfterUpdate.name,
          },
        },
      },
    });

    const recipients = chatAfterUpdate.members
      .map((x) => x.userId)
      .filter((x) => x !== currentUserId);

    // Publish new chat event
    await pubsub.publish<EventPayload>(Subscription.EventCreated, {
      recipients,
      content: event,
    });

    return event;
  },
});

export const UpdateGroupChatDescription = mutationField(
  'updateGroupChatDescription',
  {
    type: 'DescriptionUpdatedEvent',
    description: 'Update the description of a group chat',
    args: {
      chatId: nonNull(
        hashIdArg({
          description: 'Id of chat to update',
        })
      ),
      description: nonNull(
        stringArg({
          description: 'New description',
        })
      ),
    },
    authorize: (_, { chatId }, { auth }) =>
      auth.canUpdateGroupChatBasic({ chatId }),
    resolve: async (
      _,
      { chatId, description },
      { currentUserId, prisma, pubsub }
    ) => {
      const chatBeforeUpdate = await prisma.chat.findUniqueOrThrow({
        where: {
          id: chatId,
        },
        select: {
          description: true,
        },
      });

      if (description === chatBeforeUpdate.description) {
        throw new ForbiddenError('Description has not changed');
      }

      const chatAfterUpdate = await prisma.chat.update({
        data: {
          description,
        },
        select: {
          description: true,
          members: {
            select: {
              userId: true,
            },
          },
        },
        where: {
          id: chatId,
        },
      });

      const event = await prisma.event.create({
        data: {
          type: 'CHAT_UPDATE',
          chat: {
            connect: {
              id: chatId,
            },
          },
          createdBy: {
            connect: {
              id: currentUserId,
            },
          },
          chatUpdate: {
            create: {
              type: 'DESCRIPTION_UPDATED',
              descriptionBefore: chatBeforeUpdate.description,
              descriptionAfter: chatAfterUpdate.description,
            },
          },
        },
      });

      const recipients = chatAfterUpdate.members
        .map((x) => x.userId)
        .filter((x) => x !== currentUserId);

      // Publish new chat event
      await pubsub.publish<EventPayload>(Subscription.EventCreated, {
        recipients,
        content: event,
      });

      return event;
    },
  }
);

export const DeleteChatMutation = mutationField('deleteChat', {
  type: 'DeletedChat',
  description: 'Delete a chat',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of chat to be deleted',
      })
    ),
  },
  authorize: async (_, { chatId }, { auth }) =>
    await auth.canDeleteChat(chatId),
  resolve: async (_, { chatId }, { prisma, pubsub, currentUserId }) => {
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
            userId: true,
          },
        },
      },
    });

    const alert = await prisma.alert.create({
      data: {
        type: 'CHAT_DELETED',
        chat: {
          connect: {
            id: chat.id,
          },
        },
        createdBy: {
          connect: {
            id: currentUserId,
          },
        },
      },
    });

    // Publish the created chat to every member apart from the user who created it (userId)
    await pubsub.publish<NotificationPayload>(Subscription.ChatDeletedAlert, {
      recipients: chat.members
        .map((x) => x.userId)
        .filter((x) => x !== currentUserId),
      content: alert,
    });

    return chat;
  },
});
