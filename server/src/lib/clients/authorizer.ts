import { PrismaClient } from '@prisma/client';
import { ForbiddenError, UserInputError } from 'apollo-server-core';
import { IAuthorizer } from 'src/graphql/context.interface';

export class Authorizer implements IAuthorizer {
  public userId: string;

  constructor(private _prisma: PrismaClient) {}

  public async canCreateDirectMessageChat(friendId: string) {
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

  public async canCreateGroupChat(memberIds: string[]) {
    // Remove duplicates
    const memberIdSet: Set<string> = new Set(memberIds);

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
                in: memberIds,
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

  public async canViewChat(chatId: string) {
    // check if user is a member of the chat
    const user = await this._prisma.user.findUnique({
      select: {
        memberOfChats: {
          where: {
            id: chatId,
          },
        },
      },
      where: {
        id: this.userId,
      },
    });
    return user.memberOfChats.length !== 0;
  }

  /**
   * Auth to validate user can add the given members to given chat
   * @param chatId
   * @param memberIds
   * @returns
   */
  public async canAddMembersToChat(chatId: string, memberIds: string[]) {
    const chat = await this._prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        admins: {
          select: {
            id: true,
            friends: {
              select: {
                id: true,
              },
              where: {
                id: {
                  in: memberIds,
                },
              },
            },
          },
          where: {
            id: this.userId,
          },
        },
      },
    });
    if (!chat?.admins.length) {
      // no chat or not admin
      return false;
    }

    if (!chat.admins[0].friends.length) {
      // not friends with all of these users
      return false;
    }
    return true;
  }

  public async canRemoveMembersFromChat(chatId: string) {
    const chat = await this._prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        admins: {
          where: {
            id: this.userId,
          },
        },
      },
    });

    if (!chat?.admins.length && chat.isDM) return false;

    return true;
  }
}
