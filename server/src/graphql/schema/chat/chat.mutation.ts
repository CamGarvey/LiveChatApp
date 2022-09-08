import { Chat } from '@prisma/client';
import { list, mutationField, nonNull } from 'nexus';
import SubscriptionPayload from 'src/graphql/backing-types/subscription-payload';
import { Subscription } from '../../backing-types';
import { hashIdArg } from '../shared';
import { CreateGroupChatInput, UpdateGroupChatInput } from './chat.input';

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
        type: 'GroupChat',
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

    // Publish the created chat to every member apart from the user who created it (userId)
    await pubsub.publish<SubscriptionPayload<Chat>>(Subscription.ChatCreated, {
      recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
      content: chat,
    });

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
          members: {
            every: {
              id: {
                in: [friendId, userId],
              },
            },
          },
          type: 'DirectMessageChat',
        },
      });

      if (existingChat !== null) {
        return existingChat;
      }

      const chat = await prisma.chat.create({
        data: {
          name: `${userId}.${friendId}`,
          createdById: userId,
          type: 'DirectMessageChat',
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

      // Publish the created chat to every member apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Chat>>(
        Subscription.ChatCreated,
        {
          recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
          content: chat,
        }
      );

      return chat;
    },
  }
);

export const RemoveMembersFromGroupChatMutation = mutationField(
  'removeMembersFromGroupChat',
  {
    type: 'GroupChat',
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

      await prisma.event.create({
        data: {
          type: 'ChatUpdate',
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
              memberIdsRemoved: members
                ? {
                    set: [...members],
                  }
                : undefined,
            },
          },
        },
      });

      // Publish the created chat to every member apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Chat>>(
        Subscription.ChatMembersDeleted,
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
    type: 'GroupChat',
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
      const chat = await prisma.chat.update({
        data: {
          members: {
            connect: members?.map((id) => ({ id })) ?? undefined,
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

      await prisma.event.create({
        data: {
          type: 'ChatUpdate',
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
              memberIdsAdded: members
                ? {
                    set: [...members],
                  }
                : undefined,
            },
          },
        },
      });

      // Publish the created chat to every member apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Chat>>(
        Subscription.ChatMembersAdded,
        {
          recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
          content: chat,
        }
      );

      return chat;
    },
  }
);

export const RemoveAdminsFromGroupChatMutation = mutationField(
  'removeAdminsFromGroupChat',
  {
    type: 'GroupChat',
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
      const chat = await prisma.chat.update({
        data: {
          admins: {
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

      await prisma.event.create({
        data: {
          type: 'ChatUpdate',
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
              adminIdsRemoved: members
                ? {
                    set: [...members],
                  }
                : undefined,
            },
          },
        },
      });

      // Publish the created chat to every member apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Chat>>(
        Subscription.ChatAdminsDeleted,
        {
          recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
          content: chat,
        }
      );
      return chat;
    },
  }
);

export const AddAdminsToGroupChatMutation = mutationField(
  'addAdminsToGroupChat',
  {
    type: 'GroupChat',
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
      const chat = await prisma.chat.update({
        data: {
          admins: {
            connect: members?.map((id) => ({ id })) ?? undefined,
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

      await prisma.event.create({
        data: {
          type: 'ChatUpdate',
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
              adminIdsAdded: members
                ? {
                    set: [...members],
                  }
                : undefined,
            },
          },
        },
      });

      // Publish the created chat to every member apart from the user who created it (userId)
      await pubsub.publish<SubscriptionPayload<Chat>>(
        Subscription.ChatAdminsAdded,
        {
          recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
          content: chat,
        }
      );

      return chat;
    },
  }
);

export const UpdateGroupChat = mutationField('updateGroupChat', {
  type: 'GroupChat',
  args: {
    chatId: nonNull(hashIdArg()),
    data: nonNull(UpdateGroupChatInput),
  },
  description: 'Update basic group chat information',
  authorize: (_, { chatId }, { auth }) =>
    auth.canUpdateGroupChatBasic({
      chatId,
    }),

  resolve: async (
    _,
    { chatId, data: { name, description } },
    { userId, prisma, pubsub }
  ) => {
    const chat = await prisma.chat.update({
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
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

    await prisma.event.create({
      data: {
        type: 'ChatUpdate',
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
            name: name ?? undefined,
            description: description ?? undefined,
          },
        },
      },
    });

    // Publish the created chat to every member apart from the user who created it (userId)
    await pubsub.publish<SubscriptionPayload<Chat>>(
      Subscription.ChatInfoUpdated,
      {
        recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
        content: chat,
      }
    );

    return chat;
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

    // Publish the created chat to every member apart from the user who created it (userId)
    await pubsub.publish<SubscriptionPayload<Chat>>(Subscription.ChatDeleted, {
      recipients: chat.members.map((x) => x.id).filter((x) => x !== userId),
      content: chat,
    });

    return chat;
  },
});
