import { PrismaClient, RequestState } from '@prisma/client';
import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { IAuthorizer } from './authorizer.interface';

export class Authorizer implements IAuthorizer {
  public userId: number;

  constructor(private _prisma: PrismaClient) {}

  public async canCreateDirectMessageChat(friendId: number) {
    if (friendId == this.userId) {
      throw new UserInputError('friendId can not be own user');
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
            id: this.userId,
          },
        },
        memberOfChats: {
          where: {
            type: 'DIRECT_MESSAGE',
            members: {
              every: {
                id: this.userId,
              },
            },
          },
        },
      },
    });

    if (friend.friends.length == 0) {
      throw new ForbiddenError('You are not friends with this user');
    }

    return true;
  }

  public async canCreateGroupChat(memberIds: number[]) {
    // Remove duplicates
    const memberIdSet: Set<number> = new Set(memberIds);

    // Remove self from memberIdSet
    if (memberIdSet.has(this.userId)) {
      memberIdSet.delete(this.userId);
    }

    if (memberIdSet.size !== 0) {
      // Check that the user is friends with all of these users
      const user = await this._prisma.user.findUniqueOrThrow({
        where: {
          id: this.userId,
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
        throw new ForbiddenError(
          'You are not friends with all of the users provided'
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
        admins: {
          select: {
            id: true,
          },
        },
        members: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new ForbiddenError('Can not update a direct message chat');
    }

    if (!chat.admins.find((x) => x.id === this.userId)) {
      throw new ForbiddenError('You are not an admin in this chat');
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
        admins: {
          select: {
            id: true,
          },
        },
        members: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new ForbiddenError('Can not update a direct message chat');
    }

    if (!chat.admins.find((x) => x.id === this.userId)) {
      throw new ForbiddenError('You are not an admin in this chat');
    }
    // Remove duplicates
    const memberIdSet: Set<number> = new Set(data.members);

    // Remove self from sets
    if (memberIdSet.has(this.userId)) {
      memberIdSet.delete(this.userId);
    }

    if (memberIdSet.size != 0) {
      // Check that the user is friends with all of these users
      const user = await this._prisma.user.findUniqueOrThrow({
        where: {
          id: this.userId,
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
        throw new ForbiddenError(
          'You are not friends with all of the users provided'
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
        admins: {
          select: {
            id: true,
          },
        },
        members: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new ForbiddenError('Can not update a direct message chat');
    }

    // Don't need to be an admin to remove self unless the creator
    if (
      data.members.length === 1 &&
      data.members[0] === this.userId &&
      chat.createdById !== this.userId
    ) {
      return true;
    }

    if (!chat.admins.find((x) => x.id === this.userId)) {
      throw new ForbiddenError('You are not an admin in this chat');
    }

    // remove duplicates
    const memberSet = new Set(data.members);

    if (chat.createdById === this.userId) {
      if (memberSet.has(this.userId)) {
        throw new ForbiddenError(
          'You can not remove yourself as a member since you created this chat'
        );
      }
      return true;
    }

    const adminIds = new Set(chat.admins.map((x) => x.id));
    const adminSet = new Set([...memberSet].filter((x) => adminIds.has(x)));

    // you can remove yourself from chat so removing userId
    if (adminSet.has(this.userId)) {
      adminSet.delete(this.userId);
    }

    if (adminSet.size !== 0) {
      throw new ForbiddenError('You can not remove other admins');
    }
    return true;
  }

  public async canRemoveAdminsFromGroupChat(data: {
    chatId: number;
    members: number[];
  }) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        type: true,
        createdById: true,
        admins: {
          select: {
            id: true,
          },
        },
        members: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new ForbiddenError('Can not update a direct message chat');
    }

    if (!chat.admins.find((x) => x.id === this.userId)) {
      throw new ForbiddenError('You are not an admin in this chat');
    }

    // remove duplicates
    const memberSet = new Set(data.members);

    if (chat.createdById === this.userId) {
      if (memberSet.has(this.userId)) {
        throw new ForbiddenError(
          'You can not remove yourself as the admin since you created this chat'
        );
      }
      return true;
    }

    const adminIds = new Set(chat.admins.map((x) => x.id));
    const adminSet = new Set([...memberSet].filter((x) => adminIds.has(x)));

    // you can remove yourself as admin so removing userId
    adminSet.delete(this.userId);

    if (adminSet.size !== 0) {
      throw new ForbiddenError('You can remove other admins');
    }
    return true;
  }

  public async canAddAdminsToGroupChat(data: {
    chatId: number;
    members: number[];
  }) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        type: true,
        createdById: true,
        admins: {
          select: {
            id: true,
          },
        },
        members: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: data.chatId,
      },
    });

    if (chat.type === 'DIRECT_MESSAGE') {
      throw new ForbiddenError('Can not update a direct message chat');
    }

    if (!chat.admins.find((x) => x.id === this.userId)) {
      throw new ForbiddenError('You are not an admin in this chat');
    }

    // Remove duplicates
    const memberSet: Set<number> = new Set(data.members);

    // Remove self from sets
    if (memberSet.has(this.userId)) {
      memberSet.delete(this.userId);
    }

    if (memberSet.size != 0) {
      // You dont need to be friends all of the users you want to add as admin
      // They just need to already be in the chat
      const memberIds = new Set(chat.members.map((x) => x.id));

      const notMembersAlready = new Set(
        [...memberSet].filter((x) => !memberIds.has(x))
      );

      const friendCheckSet = new Set([...notMembersAlready, ...memberSet]);

      if (friendCheckSet.size != 0) {
        // Check that the user is friends with all of these users
        const user = await this._prisma.user.findUniqueOrThrow({
          where: {
            id: this.userId,
          },
          select: {
            friends: {
              select: {
                id: true,
              },
              where: {
                id: {
                  in: [...friendCheckSet],
                },
              },
            },
          },
        });

        if (user.friends.length != friendCheckSet.size) {
          throw new ForbiddenError(
            'You are not friends with all of the users provided'
          );
        }
      }
    }
    return true;
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

    if (chat.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to delete this chat'
      );
    }

    return true;
  }

  public async canViewChat(chatId: number) {
    // check if user is a member of the chat
    const chat = await this._prisma.chat.findUniqueOrThrow({
      where: {
        id: chatId,
      },
      select: {
        members: {
          select: {
            id: true,
          },
          where: {
            id: this.userId,
          },
        },
      },
    });

    if (chat.members.length == 0) {
      throw new ForbiddenError('You are not a member of this chat');
    }

    return true;
  }

  public async canCreateEvent(chatId: number) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        members: {
          select: {
            id: true,
          },
          where: {
            id: this.userId,
          },
        },
      },
      where: {
        id: chatId,
      },
    });

    if (chat.members.length == 0) {
      throw new ForbiddenError('You are not a member of this chat');
    }

    return true;
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
                id: true,
              },
              where: {
                id: this.userId,
              },
            },
          },
        },
      },
    });

    if (event.chat.members.length === 0) {
      throw new ForbiddenError('You do not have permission to view this event');
    }

    return true;
  }

  public async canUpdateEvent(eventId: number) {
    const event = await this._prisma.event.findUniqueOrThrow({
      where: {
        id: eventId,
      },
    });

    if (event.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to update this event'
      );
    }

    if (event.deletedAt) {
      throw new ForbiddenError('Event is deleted');
    }

    return true;
  }

  public async canDeletedEvent(eventId: number) {
    const event = await this._prisma.event.findUniqueOrThrow({
      where: {
        id: eventId,
      },
    });

    if (event.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to delete this event'
      );
    }

    return true;
  }

  public async canSendFriendRequest(friendId: number) {
    const user = await this._prisma.user.findUniqueOrThrow({
      where: {
        id: this.userId,
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
      throw new ForbiddenError('Already friends with this user');
    }

    return true;
  }

  public async canCancelRequest(requestId: number) {
    const request = await this._prisma.request.findUniqueOrThrow({
      where: {
        id: requestId,
      },
    });

    if (request.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to cancel this request'
      );
    }

    if (['ACCEPTED', 'DECLINED'].includes(request?.state ?? '')) {
      throw new ForbiddenError('Invalid state');
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

    if (request.recipientId !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to decline this friend request'
      );
    }

    const pendingStates: RequestState[] = ['SEEN', 'SENT'];

    if (!pendingStates.includes(request.state)) {
      throw new ForbiddenError('Invalid state');
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

    if (request.recipientId !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to accept this friend request'
      );
    }

    const pendingStates: RequestState[] = ['SEEN', 'SENT'];

    if (!pendingStates.includes(request.state)) {
      throw new ForbiddenError('Invalid state');
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
            id: this.userId,
          },
        },
      },
    });

    if (user.friends.length == 0) {
      throw new ForbiddenError('You are not friends with this user');
    }

    return true;
  }
}
