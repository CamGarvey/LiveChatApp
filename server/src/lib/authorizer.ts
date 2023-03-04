import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { IAuthorizer } from './authorizer.interface';

export class Authorizer implements IAuthorizer {
  public currentUserId: number;

  constructor(private _prisma: PrismaClient) {}

  public async canCreateDirectMessageChat(friendId: number) {
    if (friendId == this.currentUserId) {
      throw new GraphQLError('friendId can not be own user', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }

    const friend = await this._prisma.user.findUniqueOrThrow({
      where: {
        id: friendId,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
          where: {
            id: this.currentUserId,
          },
        },
      },
    });

    if (friend.friends.length == 0) {
      throw new GraphQLError('You are not friends with this user', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }

  public async canCreateGroupChat(memberIds: number[]) {
    // Remove duplicates
    const memberIdSet: Set<number> = new Set(memberIds);

    // Remove self from memberIdSet
    if (memberIdSet.has(this.currentUserId)) {
      memberIdSet.delete(this.currentUserId);
    }

    if (memberIdSet.size !== 0) {
      // Check that the user is friends with all of these users
      const user = await this._prisma.user.findUniqueOrThrow({
        where: {
          id: this.currentUserId,
        },
        select: {
          friends: {
            select: {
              id: true,
            },
            where: {
              id: {
                in: [...memberIdSet],
              },
            },
          },
        },
      });

      if (user.friends.length != memberIdSet.size) {
        throw new GraphQLError(
          'You are not friends with all of the users provided',
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        );
      }
    }
    return true;
  }

  public async canUpdateGroupChatBasic(data: { chatId: number }) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        type: true,
        createdById: true,
        members: {
          select: {
            userId: true,
            role: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new GraphQLError('Can not update a direct message chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const currentUser = chat.members.find(
      (x) => x.userId === this.currentUserId
    );

    if (!currentUser) {
      throw new GraphQLError('You are not a member of this chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    if (currentUser.role === 'BASIC') {
      throw new GraphQLError('You are not an admin in this chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    return true;
  }

  public async canAddMembersToGroupChat(data: {
    chatId: number;
    members: number[];
  }) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        type: true,
        createdById: true,
        members: {
          select: {
            userId: true,
            role: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new GraphQLError('Can not update a direct message chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const currentUser = chat.members.find(
      (x) => x.userId === this.currentUserId
    );

    if (!currentUser) {
      throw new GraphQLError('You are not a member of this chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    if (currentUser.role === 'BASIC') {
      throw new GraphQLError('You are not an admin in this chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    // Remove duplicates
    const memberIdSet: Set<number> = new Set(data.members);

    // Remove self from sets
    if (memberIdSet.has(this.currentUserId)) {
      memberIdSet.delete(this.currentUserId);
    }

    if (memberIdSet.size != 0) {
      // Check that the user is friends with all of these users
      const user = await this._prisma.user.findUniqueOrThrow({
        where: {
          id: this.currentUserId,
        },
        select: {
          friends: {
            select: {
              id: true,
            },
            where: {
              id: {
                in: [...memberIdSet],
              },
            },
          },
        },
      });

      if (user.friends.length != memberIdSet.size) {
        throw new GraphQLError(
          'You are not friends with all of the users provided',
          {
            extensions: {
              code: 'FORBIDDEN',
            },
          }
        );
      }
    }

    return true;
  }

  public async canRemoveMembersFromGroupChat(data: {
    chatId: number;
    members: number[];
  }) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        type: true,
        createdById: true,
        members: {
          select: {
            userId: true,
            role: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new GraphQLError('Can not update a direct message chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const currentUser = chat.members.find(
      (x) => x.userId === this.currentUserId
    );

    if (!currentUser) {
      throw new GraphQLError('You are not a member of this chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    // Don't need to be an admin to remove self unless the creator
    if (
      data.members.length === 1 &&
      data.members[0] === this.currentUserId &&
      currentUser.role !== 'OWNER'
    ) {
      return true;
    }

    if (currentUser.role === 'BASIC') {
      throw new GraphQLError('You are not an admin in this chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    // remove duplicates
    const memberSet = new Set(data.members);

    if (memberSet.has(chat.createdById)) {
      throw new GraphQLError('You can not remove the owner of the chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    if (currentUser.role === 'OWNER') {
      return true;
    }

    const adminIds = new Set(
      chat.members.filter((x) => x.role === 'ADMIN').map((x) => x.userId)
    );
    const adminSet = new Set([...memberSet].filter((x) => adminIds.has(x)));

    // you can remove yourself from chat so removing userId
    if (adminSet.has(this.currentUserId)) {
      adminSet.delete(this.currentUserId);
    }

    if (adminSet.size !== 0) {
      throw new GraphQLError('You can not remove other admins', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    return true;
  }

  public async canChangeMemberRoles(data: {
    chatId: number;
    members: number[];
  }) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        type: true,
        createdById: true,
        members: {
          select: {
            userId: true,
            role: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new GraphQLError('Can not update a direct message chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    const currentUser = chat.members.find(
      (x) => x.userId === this.currentUserId
    );

    if (!currentUser) {
      throw new GraphQLError('You are not a member of this chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    if (currentUser.role === 'BASIC') {
      throw new GraphQLError('You are not authorized to modify member roles', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    // remove duplicates
    const memberSet = new Set(data.members);

    if (memberSet.has(chat.createdById)) {
      throw new GraphQLError('You can not modify the owners role', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    if (currentUser.role === 'OWNER') {
      return true;
    }

    const chatAdmins = chat.members.filter((x) => x.role === 'ADMIN');

    const chatAdminsToRemove = new Set(
      chatAdmins.filter((x) => !memberSet.has(x.userId))
    );

    return chatAdminsToRemove.size == 0;
  }

  public async canDeleteChat(chatId: number) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        createdById: true,
      },
      where: {
        id: chatId,
      },
    });

    if (chat.createdById !== this.currentUserId) {
      throw new GraphQLError('You do not have permission to delete this chat', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }

  public async canViewChat(chatId: number) {
    try {
      // check if user is a member of the chat
      await this._prisma.member.findUniqueOrThrow({
        where: {
          userId_chatId: {
            chatId,
            userId: this.currentUserId,
          },
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  public async canCreateEvent(chatId: number) {
    try {
      // check if user is a member of the chat
      await this._prisma.member.findUniqueOrThrow({
        where: {
          userId_chatId: {
            chatId,
            userId: this.currentUserId,
          },
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  public async canViewEvent(eventId: number) {
    const event = await this._prisma.event.findUniqueOrThrow({
      where: {
        id: eventId,
      },
      select: {
        chat: {
          select: {
            members: {
              select: {
                userId: true,
              },
              where: {
                userId: this.currentUserId,
              },
            },
          },
        },
      },
    });

    if (event.chat.members.length === 0) {
      throw new GraphQLError('You do not have permission to view this event', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }

  public async canUpdateEvent(eventId: number) {
    const event = await this._prisma.event.findUniqueOrThrow({
      where: {
        id: eventId,
      },
    });

    if (event.createdById !== this.currentUserId) {
      throw new GraphQLError(
        'You do not have permission to update this event',
        {
          extensions: {
            code: 'FORBIDDEN',
          },
        }
      );
    }

    if (event.deletedAt) {
      throw new GraphQLError('Event is deleted', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }

  public async canDeletedEvent(eventId: number) {
    const event = await this._prisma.event.findUniqueOrThrow({
      where: {
        id: eventId,
      },
    });

    if (event.createdById !== this.currentUserId) {
      throw new GraphQLError(
        'You do not have permission to delete this event',
        {
          extensions: {
            code: 'FORBIDDEN',
          },
        }
      );
    }

    return true;
  }

  public async canSendFriendRequest(friendId: number) {
    const user = await this._prisma.user.findUniqueOrThrow({
      where: {
        id: this.currentUserId,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
          where: {
            id: friendId,
          },
        },
      },
    });

    if (user.friends.length !== 0) {
      throw new GraphQLError('Already friends with this user', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }

  public async canCancelRequest(requestId: number) {
    const request = await this._prisma.request.findUniqueOrThrow({
      where: {
        id: requestId,
      },
    });

    if (request.createdById !== this.currentUserId) {
      throw new GraphQLError(
        'You do not have permission to cancel this request'
      );
    }

    if (['ACCEPTED', 'DECLINED'].includes(request?.state ?? '')) {
      throw new GraphQLError('Invalid state', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }

  public async canDeclineRequest(requestId: number) {
    const request = await this._prisma.request.findUniqueOrThrow({
      select: {
        recipientId: true,
        state: true,
      },
      where: {
        id: requestId,
      },
    });

    if (request.recipientId !== this.currentUserId) {
      throw new GraphQLError(
        'You do not have permission to decline this request',
        {
          extensions: {
            code: 'FORBIDDEN',
          },
        }
      );
    }

    if (request.state !== 'SENT') {
      throw new GraphQLError('Invalid state', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }

  public async canAcceptRequest(requestId: number) {
    const request = await this._prisma.request.findUniqueOrThrow({
      select: {
        recipientId: true,
        state: true,
      },
      where: {
        id: requestId,
      },
    });

    if (request.recipientId !== this.currentUserId) {
      throw new GraphQLError(
        'You do not have permission to accept this request'
      );
    }

    if (request.state !== 'SENT') {
      throw new GraphQLError('Invalid state', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }

  public async canDeleteFriend(friendId: number) {
    const user = await this._prisma.user.findUniqueOrThrow({
      where: {
        id: friendId,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
          where: {
            id: this.currentUserId,
          },
        },
      },
    });

    if (user.friends.length == 0) {
      throw new GraphQLError('You are not friends with this user', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }

    return true;
  }
}
