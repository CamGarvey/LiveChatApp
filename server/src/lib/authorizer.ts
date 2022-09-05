import { PrismaClient, RequestStatus } from '@prisma/client';
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
            isDM: true,
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
        isDM: true,
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

    if (chat.isDM) {
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
        isDM: true,
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

    if (chat.isDM) {
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
      // You dont need to be friends all of the users you want to add as admin
      // They just need to already be in the chat
      const memberIds = new Set(chat.members.map((x) => x.id));

      if (memberIds.size != 0) {
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
                  in: [...memberIds],
                },
              },
            },
          },
        });

        if (user.friends.length != memberIds.size) {
          throw new ForbiddenError(
            'You are not friends with all of the users provided'
          );
        }
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
        isDM: true,
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

    if (chat.isDM) {
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
      throw new ForbiddenError('You can remove other admins');
    }
    return true;
  }

  public async canRemoveAdminsFromGroupChat(data: {
    chatId: number;
    members: number[];
  }) {
    const chat = await this._prisma.chat.findUniqueOrThrow({
      select: {
        isDM: true,
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

    if (chat.isDM) {
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
    if (adminSet.has(this.userId)) {
      adminSet.delete(this.userId);
    }

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
        isDM: true,
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

    if (chat.isDM) {
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

  public async canCreateMessage(chatId: number) {
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

  public async canViewMessage(messageId: number) {
    const message = await this._prisma.message.findUniqueOrThrow({
      where: {
        id: messageId,
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

    if (message.chat.members.length === 0) {
      throw new ForbiddenError(
        'You do not have permission to view this message'
      );
    }

    return true;
  }

  public async canUpdateMessage(messageId: number) {
    const message = await this._prisma.message.findUniqueOrThrow({
      where: {
        id: messageId,
      },
    });

    if (message.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to update this message'
      );
    }

    if (message.deletedAt) {
      throw new ForbiddenError('Message is deleted');
    }

    return true;
  }

  public async canDeletedMessage(messageId: number) {
    const message = await this._prisma.message.findUniqueOrThrow({
      where: {
        id: messageId,
      },
    });

    if (message.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to delete this message'
      );
    }

    return true;
  }

  public async canSendFriendRequest(friendId: number) {
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
        sentFriendRequests: {
          select: {
            id: true,
          },
          where: {
            recipientId: this.userId,
            status: {
              in: ['SEEN', 'SENT'],
            },
          },
        },
        receivedFriendRequests: {
          select: {
            id: true,
          },
          where: {
            createdById: this.userId,
            status: {
              in: ['SEEN', 'SENT'],
            },
          },
        },
      },
    });

    if (friend.friends.length !== 0) {
      throw new ForbiddenError('Already friends with this user');
    }

    // Make sure a request is not already sent out, either way
    if (friend.receivedFriendRequests.length !== 0) {
      throw new ForbiddenError('Already sent a friend request to this user');
    }
    if (friend.sentFriendRequests.length !== 0) {
      throw new ForbiddenError(
        'Already received a friend requets from this user'
      );
    }

    return true;
  }

  public async canCancelFriendRequest(requestId: number) {
    const request = await this._prisma.friendRequest.findUniqueOrThrow({
      select: {
        createdById: true,
        status: true,
      },
      where: {
        id: requestId,
      },
    });

    if (request.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to cancel this friend request'
      );
    }

    const pendingStates: RequestStatus[] = ['SEEN', 'SENT'];

    if (!pendingStates.includes(request.status)) {
      throw new ForbiddenError('Invalid state');
    }

    return true;
  }

  public async canDeclineFriendRequest(requestId: number) {
    const request = await this._prisma.friendRequest.findUniqueOrThrow({
      select: {
        recipientId: true,
        status: true,
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

    const pendingStates: RequestStatus[] = ['SEEN', 'SENT'];

    if (!pendingStates.includes(request.status)) {
      throw new ForbiddenError('Invalid state');
    }

    return true;
  }

  public async canAcceptFriendRequest(requestId: number) {
    const request = await this._prisma.friendRequest.findUniqueOrThrow({
      select: {
        recipientId: true,
        status: true,
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

    const pendingStates: RequestStatus[] = ['SEEN', 'SENT'];

    if (!pendingStates.includes(request.status)) {
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
