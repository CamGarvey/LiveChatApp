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

  private canRemoveMembersFromGroupChat(
    chat: {
      createdById: number;
      admins: {
        id: number;
      }[];
    },
    members: number[]
  ) {
    const isCreator = chat.createdById === this.userId;

    // Remove duplicates
    const memberIdSet: Set<number> = new Set(members);

    if (memberIdSet.has(this.userId)) {
      if (isCreator) {
        throw new ForbiddenError('You can not leave a group you created');
      }
      memberIdSet.delete(this.userId);
    }

    const adminIds = new Set(chat.admins.map((x) => x.id));

    // Check if any of the users are admins already
    const adminAlready = new Set(
      [...memberIdSet].filter((x) => adminIds.has(x))
    );

    if (adminAlready.size !== 0) {
      throw new ForbiddenError(
        'You can not remove an admin if you are not the creator of the chat'
      );
    }
    return true;
  }

  private canRemoveAdminsFromGroupChat(
    chat: {
      admins: {
        id: number;
      }[];
    },
    members: number[]
  ): boolean {
    // Remove duplicates
    const adminIdSet: Set<number> = new Set(members);

    if (adminIdSet.has(this.userId)) {
      adminIdSet.delete(this.userId);
    }

    const adminIds = new Set(chat.admins.map((x) => x.id));

    // Check if any of the users are admins already
    const adminAlready = new Set(
      [...adminIdSet].filter((x) => adminIds.has(x))
    );

    if (adminAlready.size !== 0) {
      throw new ForbiddenError(
        'You can not remove an admin if you are not the creator of the chat'
      );
    }
    return true;
  }

  private isChatAdmin = (chat: {
    admins: {
      id: number;
    }[];
  }) => chat.admins.map((x) => x.id).includes(this.userId);

  public async canUpdateGroupChat(
    chatId: number,
    data?: {
      addMemberIds?: number[];
      addAdminIds?: number[];
      removeAdminIds?: number[];
      removeMemberIds?: number[];
    }
  ) {
    const {
      addMemberIds = [],
      addAdminIds = [],
      removeAdminIds: adminsToRemove = [],
      removeMemberIds: membersToRemove = [],
    } = data ?? {
      addMemberIds: [],
      addAdminIds: [],
      removeAdminIds: [],
      removeMemberIds: [],
    };
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
        id: chatId,
      },
    });

    if (chat.isDM) {
      throw new ForbiddenError('Can not update a direct message chat');
    }

    if (!this.isChatAdmin(chat)) {
      throw new ForbiddenError('You are not an admin in this chat');
    }

    if (adminsToRemove.length !== 0) {
      const canRemove = this.canRemoveAdminsFromGroupChat(chat, adminsToRemove);
      if (!canRemove) {
        return false;
      }
    }

    if (membersToRemove.length !== 0) {
      const canRemove = this.canRemoveMembersFromGroupChat(
        chat,
        membersToRemove
      );
      if (!canRemove) {
        return false;
      }
    }

    if (addMemberIds.length !== 0 || addAdminIds.length !== 0) {
      // Remove duplicates
      const memberIdSet: Set<number> = new Set(addMemberIds);
      const adminIdSet: Set<number> = new Set(addAdminIds);

      // Remove self from sets
      if (memberIdSet.has(this.userId)) {
        memberIdSet.delete(this.userId);
      }
      if (adminIdSet.has(this.userId)) {
        adminIdSet.delete(this.userId);
      }

      if (memberIdSet.size != 0 || adminIdSet.size != 0) {
        // You dont need to be friends all of the users you want to add as admin
        // They just need to already be in the chat
        const memberIds = new Set(chat.members.map((x) => x.id));

        const notMembersAlready = new Set(
          [...adminIdSet].filter((x) => !memberIds.has(x))
        );

        const friendCheckSet = new Set([...notMembersAlready, ...memberIdSet]);

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
