import { Chat, Event, Notification } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-core';
import { list, mutationField, nonNull, stringArg } from 'nexus';
import SubscriptionPayload from 'src/graphql/backing-types/subscription-payload';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';
import { CreateGroupChatInput } from './chat.input';

export const CreateGroupChatMutation = mutationField('createGroupChat', {
  type: 'GroupChat',
  args: { data: nonNull(CreateGroupChatInput) },
  description: 'Create a Chat',
  authorize: (_, { data: { memberIds } }, { auth }) =>
    auth.canCreateGroupChat(memberIds ?? []),
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
        type: 'GROUP',
        name,
        description,
        createdById: userId,
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

    // Create an alert notification for members
    const notification = await prisma.notification.create({
      data: {
        type: 'ALERT',
        createdById: userId,
        recipients: {
          connect: chat.members,
        },
        alert: {
          create: {
            type: 'CHAT_CREATED',
            chat: {
              connect: {
                id: chat.id,
              },
            },
          },
        },
      },
    });

    // Publish notification to members
    await pubsub.publish<SubscriptionPayload<Notification>>(
      Subscription.ChatCreated,
      {
        recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
        content: notification,
      }
    );

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
      const existingChat = await prisma.chat.findFirst({
        where: {
          type: 'DIRECT_MESSAGE',
          members: {
            every: {
              id: {
                in: [friendId, userId],
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
          name: `${userId}.${friendId}`,
          createdById: userId,
          members: {
            connect: [userId, friendId].map((id) => ({ id })),
          },
        },
      });

      // Create notification for single member
      const notification = await prisma.notification.create({
        data: {
          type: 'ALERT',
          recipients: {
            connect: [userId, friendId].map((id) => ({ id })),
          },
          createdById: userId,
          alert: {
            create: {
              type: 'CHAT_CREATED',
              chat: {
                connect: {
                  id: chat.id,
                },
              },
            },
          },
        },
      });
      // Publish the created chat to every member apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Notification>>(
        Subscription.ChatCreated,
        {
          recipients: [userId],
          content: notification,
        }
      );

      return chat;
    },
  }
);

export const RemoveMembersFromGroupChatMutation = mutationField(
  'removeMembersFromGroupChat',
  {
    type: 'MembersRemoved',
    args: {
      chatId: nonNull(hashIdArg()),
      members: nonNull(
        list(
          nonNull(
            hashIdArg({
              description: 'Ids of members to be removed from the chat',
            })
          )
        )
      ),
    },
    description: 'Remove members from a group chat',
    authorize: (_, { chatId, members }, { auth }) =>
      auth.canRemoveMembersFromGroupChat({
        chatId,
        members,
      }),
    resolve: async (_, { chatId, members }, { userId, prisma, pubsub }) => {
      const chat = await prisma.chat.update({
        data: {
          members: {
            disconnect: members?.map((id) => ({ id })) ?? undefined,
          },
        },
        include: {
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

      if (members.length == 0) return chat;

      await prisma.event.create({
        data: {
          type: 'CHAT_UPDATE',
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
          chatUpdate: {
            create: {
              type: 'MEMBERS_REMOVED',
              users: members
                ? {
                    connect: members.map(({ id }) => ({ id })),
                  }
                : undefined,
            },
          },
        },
      });

      if (members.length == 0) return chat;

      // Publish the created chat to every member apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Chat>>(
        Subscription.ChatAdminsRemoved,
        {
          recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
          content: chat,
        }
      );

      return chat;
    },
  }
);

export const AddMembersToGroupChatMutation = mutationField(
  'addMembersToGroupChat',
  {
    type: 'MembersAdded',
    args: {
      chatId: nonNull(hashIdArg()),
      members: nonNull(
        list(
          nonNull(
            hashIdArg({
              description: 'Ids of members to be added into the chat',
            })
          )
        )
      ),
    },
    description: 'Add members to a group chat',
    authorize: (_, { chatId, members }, { auth }) =>
      auth.canAddMembersToGroupChat({
        chatId,
        members,
      }),
    resolve: async (_, { chatId, members }, { userId, prisma, pubsub }) => {
      if (members.length === 0)
        throw new ForbiddenError('Member list must not be empty');

      const chat = await prisma.chat.update({
        data: {
          members: {
            connect: members.map((id) => ({ id })) ?? undefined,
          },
        },
        include: {
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
              id: userId,
            },
          },
          chatUpdate: {
            create: {
              type: 'MEMBERS_ADDED',
              users: members
                ? {
                    connect: members.map(({ id }) => ({ id })),
                  }
                : undefined,
            },
          },
        },
      });

      // Publish the created chat to every member apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Event>>(
        Subscription.ChatMembersAdded,
        {
          recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
          content: event,
        }
      );

      return event;
    },
  }
);

export const RemoveAdminsFromGroupChatMutation = mutationField(
  'removeAdminsFromGroupChat',
  {
    type: 'AdminsRemoved',
    args: {
      chatId: nonNull(hashIdArg()),
      members: nonNull(
        list(
          nonNull(
            hashIdArg({
              description: 'Ids of admins to be removed from the chat',
            })
          )
        )
      ),
    },
    description: 'Remove admins from a group chat',
    authorize: (_, { chatId, members }, { auth }) =>
      auth.canRemoveAdminsFromGroupChat({
        chatId,
        members,
      }),
    resolve: async (_, { chatId, members }, { userId, prisma, pubsub }) => {
      if (members.length === 0)
        throw new ForbiddenError('Member list must not be empty');

      const chat = await prisma.chat.update({
        data: {
          admins: {
            disconnect: members.map((id) => ({ id })) ?? undefined,
          },
        },
        include: {
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
              id: userId,
            },
          },
          chatUpdate: {
            create: {
              type: 'ADMINS_REMOVED',
              users: members
                ? {
                    connect: members.map(({ id }) => ({ id })),
                  }
                : undefined,
            },
          },
        },
      });

      // Publish the created chat to every member
      // apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Event>>(
        Subscription.ChatAdminsRemoved,
        {
          recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
          content: event,
        }
      );

      return event;
    },
  }
);

export const AddAdminsToGroupChatMutation = mutationField(
  'addAdminsToGroupChat',
  {
    type: 'AdminsAdded',
    args: {
      chatId: nonNull(hashIdArg()),
      members: nonNull(
        list(
          nonNull(
            hashIdArg({
              description: 'Ids of admins to be added to the chat',
            })
          )
        )
      ),
    },
    description: 'Add admins to a group chat',
    authorize: (_, { chatId, members }, { auth }) =>
      auth.canAddAdminsToGroupChat({
        chatId,
        members,
      }),
    resolve: async (_, { chatId, members }, { userId, prisma, pubsub }) => {
      if (members.length === 0)
        throw new ForbiddenError('Member list must not be empty');
      const chat = await prisma.chat.update({
        data: {
          admins: {
            connect: members.map((id) => ({ id })) ?? undefined,
          },
        },
        include: {
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
              id: userId,
            },
          },
          chatUpdate: {
            create: {
              type: 'ADMINS_ADDED',
              users: members
                ? {
                    connect: members.map(({ id }) => ({ id })),
                  }
                : undefined,
            },
          },
        },
      });

      // Publish the created chat to every member
      // apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Event>>(
        Subscription.ChatAdminsAdded,
        {
          recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
          content: event,
        }
      );

      return chat;
    },
  }
);

export const UpdateGroupChatName = mutationField('updateGroupChatName', {
  type: 'NameUpdated',
  args: {
    chatId: nonNull(hashIdArg()),
    name: nonNull(stringArg()),
  },
  authorize: (_, { chatId }, { auth }) =>
    auth.canUpdateGroupChatBasic({ chatId }),
  resolve: async (_, { chatId, name }, { userId, prisma, pubsub }) => {
    const chatBeforeUpdate = await prisma.chat.findUniqueOrThrow({
      where: {
        id: chatId,
      },
      select: {
        name: true,
      },
    });
    const chatAfterUpdate = await prisma.chat.update({
      data: {
        name,
      },
      include: {
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
            id: userId,
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

    // Publish the created chat to every member
    // apart from the user who created it (userId)
    await pubsub.publish<SubscriptionPayload<Event>>(
      Subscription.ChatNameUpdated,
      {
        recipients: chatAfterUpdate.members
          .map((x) => x.id)
          .filter((x) => x !== userId),
        content: event,
      }
    );

    return event;
  },
});

export const UpdateGroupChatDescription = mutationField(
  'updateGroupChatDescription',
  {
    type: 'DescriptionUpdated',
    args: {
      chatId: nonNull(hashIdArg()),
      description: nonNull(stringArg()),
    },
    authorize: (_, { chatId }, { auth }) =>
      auth.canUpdateGroupChatBasic({ chatId }),
    resolve: async (_, { chatId, description }, { userId, prisma, pubsub }) => {
      const chatBeforeUpdate = await prisma.chat.findUniqueOrThrow({
        where: {
          id: chatId,
        },
        select: {
          description: true,
        },
      });
      const chatAfterUpdate = await prisma.chat.update({
        data: {
          description,
        },
        include: {
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
              id: userId,
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

      // Publish the created chat to every member
      // apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Event>>(
        Subscription.ChatDescriptionUpdated,
        {
          recipients: chatAfterUpdate.members
            .map((x) => x.id)
            .filter((x) => x !== userId),
          content: event,
        }
      );

      return event;
    },
  }
);

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
  resolve: async (_, { chatId }, { prisma, pubsub, userId }) => {
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

    const event = await prisma.notification.create({
      data: {
        type: 'ALERT',
        createdBy: {
          connect: {
            id: userId,
          },
        },
        alert: {
          create: {
            type: 'CHAT_DELETED',
            chat: {
              connect: {
                id: chat.id,
              },
            },
          },
        },
      },
    });

    // Publish the created chat to every member apart from the user who created it (userId)
    await pubsub.publish<SubscriptionPayload<Notification>>(
      Subscription.ChatDeleted,
      {
        recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
        content: event,
      }
    );

    return chat;
  },
});
