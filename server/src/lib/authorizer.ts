import { PrismaClient } from '@prisma/client';
import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { IAuthorizer } from 'src/graphql/context.interface';

export class Authorizer implements IAuthorizer {
  public userId: number;

  constructor(private _prisma: PrismaClient) {}

  public async canCreateDirectMessageChat(friendId: number) {
    if (friendId == this.userId) {
      throw new UserInputError('friendId can not be null or own user');
    }

    const friend = await this._prisma.user.findUnique({
      where: {
        id: friendId,
      },
      include: {
        friends: {
          where: {
            id: this.userId,
          },
        },
      },
    });

    if (!friend) {
      throw new ForbiddenError('User does not exist');
    }

    if (friend.friends.length == 0) {
      throw new ForbiddenError('You are not friends with this user');
    }

    return true;
  }

  public async canCreateGroupChat(memberIds: number[]) {
    // Remove duplicates
    const memberIdSet: Set<number> = new Set(memberIds);

    if (memberIdSet.has(this.userId)) {
      // Remove self from memberIdSet
      memberIdSet.delete(this.userId);
    }

    if (memberIdSet) {
      // Check that the user is friends with all of these users
      const user = await this._prisma.user.findUnique({
        where: {
          id: this.userId,
        },
        select: {
          friends: {
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

  public async canUpdateGroupChat(chatId: number, addMemberIds: number[]) {
    const chat = await this._prisma.chat.findUnique({
      select: {
        isDM: true,
        admins: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: chatId,
      },
    });

    if (!chat) {
      throw new ForbiddenError('Chat does not exist');
    }

    if (chat.isDM) {
      throw new ForbiddenError('Can not update Direct Message Chat');
    }

    if (!chat.admins.map((x) => x.id).includes(this.userId)) {
      throw new ForbiddenError('You are not an admin in this chat');
    }

    if (addMemberIds.length) {
      // Remove duplicates
      const memberIdSet: Set<number> = new Set(addMemberIds);

      if (memberIdSet.has(this.userId)) {
        // Remove self from memberIdSet
        memberIdSet.delete(this.userId);
      }

      if (memberIdSet) {
        // Check that the user is friends with all of these users
        const user = await this._prisma.user.findUnique({
          where: {
            id: this.userId,
          },
          select: {
            friends: {
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
    }

    return true;
  }

  public async canDeleteChat(chatId: number) {
    const chat = await this._prisma.chat.findUnique({
      select: {
        createdById: true,
      },
      where: {
        id: chatId,
      },
    });

    if (!chat) {
      throw new UserInputError('Chat does not exist');
    }

    if (chat.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to delete this chat'
      );
    }

    return true;
  }

  public async canViewChat(chatId: number) {
    // check if user is a member of the chat
    const chat = await this._prisma.chat.findUnique({
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

    if (!chat) {
      throw new UserInputError('Chat does not exist');
    }

    if (chat.members.length == 0) {
      throw new ForbiddenError('You are not a member of this chat');
    }

    return true;
  }

  public async canCreateMessage(chatId: number) {
    const chat = await this._prisma.chat.findUnique({
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

    if (!chat) {
      throw new UserInputError('Chat does not exist');
    }

    if (chat.members.length == 0) {
      throw new ForbiddenError('You are not a member of this chat');
    }

    return true;
  }

  public async canViewMessage(messageId: number) {
    const message = await this._prisma.message.findUnique({
      where: {
        id: messageId,
      },
      select: {
        createdById: true,
        chat: {
          select: {
            members: {
              where: {
                id: this.userId,
              },
            },
          },
        },
      },
    });

    if (!message) {
      throw new UserInputError('Message does not exist');
    }

    // Either have to be in the chat where the message was created or be the creator
    if (
      message.chat.members.length == 0 ||
      message.createdById !== this.userId
    ) {
      throw new ForbiddenError(
        'You do not have permission to view this message'
      );
    }

    return true;
  }

  public async canSendFriendRequest(friendId: number) {
    const friend = await this._prisma.user.findUnique({
      where: {
        id: friendId,
      },
      include: {
        friends: {
          where: {
            id: this.userId,
          },
        },
        sentFriendRequests: {
          where: {
            recipientId: this.userId,
          },
        },
        receivedFriendRequests: {
          where: {
            createdById: this.userId,
          },
        },
      },
    });

    if (!friend) {
      throw new UserInputError('User does not exist');
    }

    if (friend.friends.length !== 0) {
      throw new ForbiddenError('Already friends with this user');
    }

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
    const request = await this._prisma.friendRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new Error('Request does not exist');
    }

    if (request.createdById !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to cancel this friend request'
      );
    }

    return true;
  }

  public async canDeclineFriendRequest(requestId: number) {
    const request = await this._prisma.friendRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new Error('Request does not exist');
    }

    if (request.recipientId !== this.userId) {
      throw new ForbiddenError(
        'You do not have permission to accept this friend request'
      );
    }

    return true;
  }

  public async canAcceptFriendRequest(requestId: number) {
    const request = await this._prisma.friendRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new Error('Request does not exist');
    }

    if (request.recipientId !== this.userId) {
      throw new ForbiddenError('You do not have permission to accept request');
    }

    return true;
  }

  public async canDeleteFriend(friendId: number) {
    console.log('HELLO');

    const user = await this._prisma.user.findUnique({
      where: {
        id: friendId,
      },
      include: {
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

    if (!user) {
      throw new Error('User does not exist');
    }

    if (user.friends.length == 0) {
      throw new ForbiddenError('You are not friends with this user');
    }

    return true;
  }
}
