import { GraphQLError } from 'graphql';
import { arg, list, mutationField, nonNull } from 'nexus';
import {
  EventPayload,
  Subscription,
  NotificationPayload,
} from '../../../backing-types';
import { hashIdArg } from '../../shared';

export const ChangeRole = mutationField('changeRole', {
  type: 'RoleChangedEvent',
  description: 'Change the role of a list of members',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of the chat',
      })
    ),
    role: nonNull(
      arg({
        type: 'Role',
        description: 'New role for members',
      })
    ),
    members: nonNull(
      list(
        nonNull(
          hashIdArg({
            description: 'Ids of the affected members',
          })
        )
      )
    ),
  },
  authorize: (_, { chatId, members }, { auth }) =>
    auth.canChangeMemberRoles({
      chatId,
      members,
    }),
  resolve: async (
    _,
    { chatId, role, members },
    { currentUserId, prisma, pubsub }
  ) => {
    // Remove duplicates
    const memberIdSet: Set<number> = new Set(members);
    memberIdSet.delete(currentUserId);

    if (members.length === 0)
      throw new GraphQLError('Member list must not be empty');

    const chat = await prisma.chat.update({
      data: {
        members: {
          updateMany: {
            data: {
              role,
            },
            where: {
              userId: {
                in: [...memberIdSet],
              },
            },
          },
        },
      },
      select: {
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

    // Create new chat event
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
            type: 'ROLE_CHANGED',
            newRole: role,
            members: memberIdSet
              ? {
                  connect: [...memberIdSet].map((userId) => ({
                    userId_chatId: {
                      chatId,
                      userId,
                    },
                  })),
                }
              : undefined,
          },
        },
      },
    });

    const recipients = chat.members
      .map((x) => x.userId)
      .filter((x) => x !== currentUserId);

    // Publish new chat event
    await pubsub.publish<EventPayload>(Subscription.EventCreated, {
      recipients,
      content: event,
    });

    // Create new alert for those affected
    const alert = await prisma.alert.create({
      data: {
        type: 'CHAT_ROLE_CHANGED',
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
        recipients: memberIdSet
          ? {
              connect: [...memberIdSet].map((id) => ({ id })),
            }
          : undefined,
      },
    });

    // Publish new chat alert
    await pubsub.publish<NotificationPayload>(
      Subscription.ChatAdminAccessRevokedAlert,
      {
        recipients,
        content: alert,
      }
    );

    return event;
  },
});

export const RemoveMembersMutation = mutationField('removeMembers', {
  type: 'MembersRemovedEvent',
  description: 'Remove members from a group chat',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of the chat',
      })
    ),
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
  authorize: (_, { chatId, members }, { auth }) =>
    auth.canRemoveMembersFromGroupChat({
      chatId,
      members,
    }),
  resolve: async (
    _,
    { chatId, members },
    { currentUserId, prisma, pubsub }
  ) => {
    const chat = await prisma.chat.update({
      data: {
        members: {
          updateMany: {
            data: {
              removedAt: new Date().toISOString(),
              removedById: currentUserId,
            },
            where: {
              userId: {
                in: members,
              },
            },
          },
        },
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
            type: 'MEMBERS_REMOVED',
            members: members
              ? {
                  connect: members.map((userId) => ({
                    userId_chatId: {
                      chatId,
                      userId,
                    },
                  })),
                }
              : undefined,
          },
        },
      },
    });

    // Publish new chat event
    await pubsub.publish<EventPayload>(Subscription.EventCreated, {
      recipients: chat.members
        .map((x) => x.userId)
        .filter((x) => x !== currentUserId),
      content: event,
    });

    const alert = await prisma.alert.create({
      data: {
        type: 'CHAT_ACCESS_REVOKED',
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
        recipients: members
          ? {
              connect: members.map((id) => ({ id })),
            }
          : undefined,
      },
    });

    // Publish new chat alert
    await pubsub.publish<NotificationPayload>(
      Subscription.ChatMemberAccessRevokedAlert,
      {
        recipients: members,
        content: alert,
      }
    );

    return event;
  },
});

export const LeaveGroupChatMutation = mutationField('leaveGroupChat', {
  type: 'MembersRemovedEvent',
  description: 'Leave a group chat',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of the chat to leave',
      })
    ),
  },
  authorize: (_, { chatId }, { auth, currentUserId }) =>
    auth.canRemoveMembersFromGroupChat({
      chatId,
      members: [currentUserId],
    }),
  resolve: async (_, { chatId }, { currentUserId, prisma, pubsub }) => {
    const chat = await prisma.chat.update({
      data: {
        members: {
          update: {
            data: {
              removedAt: new Date().toISOString(),
              removedById: currentUserId,
            },
            where: {
              userId_chatId: {
                chatId,
                userId: currentUserId,
              },
            },
          },
        },
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
            type: 'MEMBERS_REMOVED',
            members: {
              connect: {
                userId_chatId: {
                  chatId,
                  userId: currentUserId,
                },
              },
            },
          },
        },
      },
    });

    // Filter current user from reciepients
    const recipients = chat.members
      .map((x) => x.userId)
      .filter((x) => x !== currentUserId);

    // Publish new chat event
    await pubsub.publish<EventPayload>(Subscription.EventCreated, {
      recipients,
      content: event,
    });

    const alert = await prisma.alert.create({
      data: {
        type: 'CHAT_ACCESS_REVOKED',
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
        recipients: {
          connect: {
            id: currentUserId,
          },
        },
      },
    });

    // Publish new chat alert
    await pubsub.publish<NotificationPayload>(
      Subscription.ChatMemberAccessRevokedAlert,
      {
        recipients,
        content: alert,
      }
    );

    return event;
  },
});

export const AddMembersMutation = mutationField('addMembers', {
  type: 'MembersAddedEvent',
  description: 'Add members to a group chat',
  args: {
    chatId: nonNull(
      hashIdArg({
        description: 'Id of the chat',
      })
    ),
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
  authorize: (_, { chatId, members }, { auth }) =>
    auth.canAddMembersToGroupChat({
      chatId,
      members,
    }),
  resolve: async (
    _,
    { chatId, members },
    { currentUserId, prisma, pubsub }
  ) => {
    // Remove duplicates & creator as members
    const memberIdSet: Set<number> = new Set(members);
    memberIdSet.delete(currentUserId);

    if (members.length === 0)
      throw new GraphQLError('Member list must not be empty');

    const chat = await prisma.chat.update({
      data: {
        members: {
          // Create new members
          createMany: {
            data: [...memberIdSet].map((id) => ({
              userId: id,
              role: 'BASIC',
              addedById: currentUserId,
            })),
            // Skipping duplicates as they will be updated below
            skipDuplicates: true,
          },
          // "Undeleting" members that have been deleted
          updateMany: {
            data: {
              removedAt: null,
              removedById: null,
              role: 'BASIC',
            },
            where: {
              userId: {
                in: [...memberIdSet],
              },
            },
          },
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
            id: currentUserId,
          },
        },
        chatUpdate: {
          create: {
            type: 'MEMBERS_ADDED',
            members: members
              ? {
                  connect: members.map((userId) => ({
                    userId_chatId: {
                      chatId,
                      userId,
                    },
                  })),
                }
              : undefined,
          },
        },
      },
    });

    const recipients = chat.members
      .map((x) => x.id)
      .filter((x) => x !== currentUserId);

    // Publish new chat event
    await pubsub.publish<EventPayload>(Subscription.EventCreated, {
      recipients,
      content: event,
    });

    const alert = await prisma.alert.create({
      data: {
        type: 'CHAT_ACCESS_GRANTED',
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
        recipients: members
          ? {
              connect: members.map((id) => ({ id })),
            }
          : undefined,
      },
    });

    // Publish new chat alert
    await pubsub.publish<NotificationPayload>(
      Subscription.ChatMemberAccessGrantedAlert,
      {
        recipients,
        content: alert,
      }
    );

    return event;
  },
});
