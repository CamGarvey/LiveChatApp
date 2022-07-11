import { ForbiddenError } from 'apollo-server-core';
import { mutationField, nonNull, stringArg, booleanArg, list } from 'nexus';
import { Subscription } from '../../../backing-types';

export const createChat = mutationField('createChat', {
  type: 'Chat',
  args: {
    name: nonNull(
      stringArg({
        description: 'Name of the Chat',
      })
    ),
    description: stringArg({
      description: 'Description of Chat',
    }),
    isPrivate: booleanArg({
      description: 'If the Chat should be private',
      default: true,
    }),
    memberIds: list(
      nonNull(
        stringArg({
          description: 'Ids of Users to be added to Chat',
        })
      )
    ),
  },
  description: 'Create a Chat',
  resolve: async (
    _,
    { name, description, isPrivate, memberIds },
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
