import { Chat, Message, PrismaClient, Request, User } from '@prisma/client';
import { MockContext, createMockContext } from '../context';
import { Authorizer } from './authorizer';

let mockCtx: MockContext;
let authorizer: Authorizer;

beforeEach(() => {
  mockCtx = createMockContext();
  const prisma = mockCtx.prisma as unknown as PrismaClient;
  authorizer = new Authorizer(prisma);
  authorizer.currentUserId = 1;
});

describe('canCreateDirectMessageChat', () => {
  it('should throw if friendId is same as userId', async () => {
    await expect(authorizer.canCreateDirectMessageChat(1)).rejects.toThrowError(
      'friendId can not be own user'
    );

    expect(mockCtx.prisma.user.findUniqueOrThrow).not.toBeCalled();
  });

  it('should throw if friend not found', async () => {
    mockCtx.prisma.user.findUniqueOrThrow.mockRejectedValue(new Error());
    await expect(
      authorizer.canCreateDirectMessageChat(100)
    ).rejects.toThrowError();

    expect(mockCtx.prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
      where: {
        id: 100,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
          where: {
            id: 1,
          },
        },
        memberOfChats: {
          where: {
            isDM: true,
            members: {
              every: {
                id: 1,
              },
            },
          },
        },
      },
    });
  });

  it('should throw if user is not friends with the user', async () => {
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canCreateDirectMessageChat(100)
    ).rejects.toThrowError('You are not friends with this user');

    expect(mockCtx.prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
      where: {
        id: 100,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
          where: {
            id: 1,
          },
        },
        memberOfChats: {
          where: {
            isDM: true,
            members: {
              every: {
                id: 1,
              },
            },
          },
        },
      },
    });
  });

  it('should return true if friends with user', async () => {
    const user = {
      friends: [
        {
          id: 1,
        },
      ],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canCreateDirectMessageChat(100);

    expect(result).toBe(true);
    expect(mockCtx.prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
      where: {
        id: 100,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
          where: {
            id: 1,
          },
        },
        memberOfChats: {
          where: {
            isDM: true,
            members: {
              every: {
                id: 1,
              },
            },
          },
        },
      },
    });
  });
});

describe('canCreateGroupChat', () => {
  it('should return true if not members to add', async () => {
    const members: number[] = [];

    const result = await authorizer.canCreateGroupChat(members);

    expect(result).toBe(true);
  });

  it('should return true if only member to add is the current user', async () => {
    const members: number[] = [1];

    const result = await authorizer.canCreateGroupChat(members);

    expect(result).toBe(true);
  });

  it('should throw if can not find user', async () => {
    const members: number[] = [100];
    mockCtx.prisma.user.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canCreateGroupChat(members)).rejects.toThrowError();
  });

  it('should throw if not friends with all of the users', async () => {
    const members: number[] = [100];
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(authorizer.canCreateGroupChat(members)).rejects.toThrowError(
      'You are not friends with all of the users provided'
    );
  });

  it('should return true if friends with all of the users', async () => {
    const members: number[] = [100, 200];
    const user = {
      friends: [{ id: 100 }, { id: 200 }],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canCreateGroupChat(members);

    expect(result).toBe(true);
  });

  it('should not include current user in prisma query', async () => {
    const members: number[] = [1, 100, 200];
    const user = {
      friends: [{ id: 100 }, { id: 200 }],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canCreateGroupChat(members);

    expect(result).toBe(true);
  });

  it('should not include duplicate users in prisma query', async () => {
    const members: number[] = [1, 100, 200, 200, 200, 100];
    const user = {
      friends: [{ id: 100 }, { id: 200 }],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canCreateGroupChat(members);

    expect(result).toBe(true);
  });
});

describe('canRemoveMembersFromGroupChat', () => {
  it('should throw if chat is DM', async () => {
    const chat = {
      isDM: true,
      admins: [{ id: 1 }, { id: 2 }, { id: 10 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canRemoveMembersFromGroupChat({ chatId: 100, members: [2] })
    ).rejects.toThrowError('Can not update a direct message chat');
  });

  it('should throw if user is not an admin', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 2 }, { id: 10 }],
      members: [{ id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canRemoveMembersFromGroupChat({ chatId: 100, members: [2] })
    ).rejects.toThrowError('You are not an admin in this chat');
  });

  it('should throw if user is not creator and removing admin', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }, { id: 2 }, { id: 10 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canRemoveMembersFromGroupChat({ chatId: 100, members: [2] })
    ).rejects.toThrowError('You can remove other admins');
  });

  it('should return true if user is creator and removing admin', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }, { id: 2 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 1,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canRemoveMembersFromGroupChat({
      chatId: 100,
      members: [2],
    });

    expect(result).toBe(true);
  });
});

describe('canAddMembersToGroupChat', () => {
  it('should throw if chat is DM', async () => {
    const chat = {
      isDM: true,
      admins: [{ id: 1 }, { id: 2 }, { id: 10 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canAddMembersToGroupChat({ chatId: 100, members: [2] })
    ).rejects.toThrowError('Can not update a direct message chat');
  });

  it('should throw if user is not an admin', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 2 }, { id: 10 }],
      members: [{ id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canAddMembersToGroupChat({ chatId: 100, members: [2] })
    ).rejects.toThrowError('You are not an admin in this chat');
  });

  it('should throw if adding a stranger', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }, { id: 2 }, { id: 10 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canAddMembersToGroupChat({ chatId: 100, members: [3] })
    ).rejects.toThrowError(
      'You are not friends with all of the users provided'
    );
  });
});

describe('canUpdateGroupChatBasic', () => {
  it('should throw if chat is DM', async () => {
    const chat = {
      isDM: true,
      admins: [{ id: 1 }, { id: 2 }, { id: 10 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canUpdateGroupChatBasic({ chatId: 100 })
    ).rejects.toThrowError('Can not update a direct message chat');
  });

  it('should throw if user is not an admin', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 2 }, { id: 10 }],
      members: [{ id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canUpdateGroupChatBasic({ chatId: 100 })
    ).rejects.toThrowError('You are not an admin in this chat');
  });

  it('should return true if user is an admin', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }, { id: 2 }, { id: 10 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 10,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canUpdateGroupChatBasic({ chatId: 100 });

    expect(result).toBe(true);
  });
});

describe('canDeleteChat', () => {
  it('should throw if chat not found', async () => {
    mockCtx.prisma.chat.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canDeleteChat(100)).rejects.toThrowError();
  });

  it('should throw if user does not own the chat', async () => {
    const chat = {
      createdById: 2,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);

    await expect(authorizer.canDeleteChat(100)).rejects.toThrowError(
      'You do not have permission to delete this chat'
    );
  });

  it('should return true if user owns chat', async () => {
    const chat = {
      createdById: 1,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);

    const result = await authorizer.canDeleteChat(100);

    expect(result).toBe(true);
  });
});

describe('canViewChat', () => {
  it('should throw if chat not found', async () => {
    mockCtx.prisma.chat.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canViewChat(100)).rejects.toThrowError();
  });

  it('should throw if user is not a member in chat', async () => {
    const chat = {
      members: [],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);

    await expect(authorizer.canViewChat(100)).rejects.toThrowError(
      'You are not a member of this chat'
    );
  });

  it('should return true if user is a member of the chat', async () => {
    const chat = {
      members: [{ id: 1 }],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);

    const result = await authorizer.canViewChat(100);

    expect(result).toBe(true);
  });
});

describe('canCreateMessage', () => {
  it('should throw if chat not found', async () => {
    mockCtx.prisma.chat.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canCreateEvent(100)).rejects.toThrowError();
  });

  it('should throw if user is not a member of the chat', async () => {
    const chat = {
      members: [],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);

    await expect(authorizer.canCreateEvent(100)).rejects.toThrowError(
      'You are not a member of this chat'
    );
  });

  it('should return true if user is a member of the chat', async () => {
    const chat = {
      members: [{ id: 1 }],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);

    const result = await authorizer.canCreateEvent(100);

    expect(result).toBe(true);
  });
});

describe('canViewMessage', () => {
  it('should throw if message not found', async () => {
    mockCtx.prisma.message.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canViewEvent(100)).rejects.toThrowError();
  });

  it('should throw if not member of the chat message was created in', async () => {
    const message = {
      createdById: 300,
      chat: {
        members: [],
      },
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    await expect(authorizer.canViewEvent(100)).rejects.toThrowError(
      'You do not have permission to view this message'
    );
  });

  it('should return true if user is a member of the chat message is created in', async () => {
    const message = {
      createdById: 300,
      chat: {
        members: [{ id: 1 }],
      },
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    const result = await authorizer.canViewEvent(100);

    expect(result).toBe(true);
  });
});

describe('canUpdateMessage', () => {
  it('should throw if message not found', async () => {
    mockCtx.prisma.message.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canUpdateEvent(100)).rejects.toThrowError();
  });

  it('should throw if the user is not the creator of the message', async () => {
    const message = {
      createdById: 300,
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    await expect(authorizer.canUpdateEvent(100)).rejects.toThrowError(
      'You do not have permission to update this message'
    );
  });

  it('should throw if the message is deleted', async () => {
    const message = {
      createdById: 1,
      deletedAt: new Date(),
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    await expect(authorizer.canUpdateEvent(100)).rejects.toThrowError(
      'Message is deleted'
    );
  });

  it('should return true if user is the creator and the message is not deleted', async () => {
    const message = {
      createdById: 1,
      deletedAt: null,
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    const result = await authorizer.canUpdateEvent(100);

    expect(result).toBe(true);
  });
});

describe('canDeletedMessage', () => {
  it('should throw if message not found', async () => {
    mockCtx.prisma.message.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canDeletedEvent(100)).rejects.toThrowError();
  });

  it('should throw if the user is not the creator of the message', async () => {
    const message = {
      createdById: 300,
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    await expect(authorizer.canDeletedEvent(100)).rejects.toThrowError(
      'You do not have permission to delete this message'
    );
  });

  it('should return true if user is the creator', async () => {
    const message = {
      createdById: 1,
      deletedAt: null,
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    const result = await authorizer.canDeletedEvent(100);

    expect(result).toBe(true);
  });
});

describe('canSendFriendRequest', () => {
  it('should throw if friend not found', async () => {
    mockCtx.prisma.user.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canSendFriendRequest(100)).rejects.toThrowError();
  });

  it('should throw if already friends with the user', async () => {
    const user = {
      friends: [{ id: 100 }],
      receivedFriendRequests: [],
      sentFriendRequests: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(authorizer.canSendFriendRequest(100)).rejects.toThrowError(
      'Already friends with this user'
    );
  });

  it('should throw if there is a SENT state request sent', async () => {
    const friend = {
      friends: [],
      receivedFriendRequests: [{ id: 100 }],
      sentFriendRequests: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(friend);

    await expect(authorizer.canSendFriendRequest(100)).rejects.toThrowError(
      'Already sent a request to this user'
    );
  });

  it('should throw if there is a SENT state request received', async () => {
    const friend = {
      friends: [],
      receivedFriendRequests: [],
      sentFriendRequests: [{ id: 100 }],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(friend);

    await expect(authorizer.canSendFriendRequest(100)).rejects.toThrowError(
      'Already received a friend requets from this user'
    );
  });

  it('should return true if not friends with user, and not pending requests', async () => {
    const friend = {
      friends: [],
      receivedFriendRequests: [],
      sentFriendRequests: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(friend);

    const result = await authorizer.canSendFriendRequest(100);

    expect(result).toBe(true);
});

describe('canCancelFriendRequest', () => {
  it('should throw if request not found', async () => {
    mockCtx.prisma.request.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canCancelRequest(100)).rejects.toThrowError();
  });

  it('should throw if user is not the creator of the request', async () => {
    const request = {
      createdById: 100,
      state: 'SENT',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canCancelRequest(100)).rejects.toThrowError(
      'You do not have permission to cancel this request'
    );
  });

  it('should throw if request is not in a pending state (SEEN or SENT)', async () => {
    const request = {
      createdById: 1,
      state: 'ACCEPTED',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canCancelRequest(100)).rejects.toThrowError(
      'Invalid state'
    );
  });

  it('should return true if the request is created by current user and SENT state', async () => {
    const request = {
      createdById: 1,
      state: 'SENT',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    const result = await authorizer.canCancelRequest(100);

    expect(result).toBe(true);
  });
});

describe('canDeclineFriendRequest', () => {
  it('should throw if request not found', async () => {
    mockCtx.prisma.request.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canDeclineRequest(100)).rejects.toThrowError();
  });

  it('should throw if the user is not the recipent of the request', async () => {
    const request = {
      recipientId: 100,
      state: 'SENT',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canDeclineRequest(100)).rejects.toThrowError(
      'You do not have permission to decline this request'
    );
  });

  it('should throw if request is not in SENT state', async () => {
    const request = {
      recipientId: 1,
      state: 'ACCEPTED',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canDeclineRequest(100)).rejects.toThrowError(
      'Invalid state'
    );
  });

  it('should return true if the user is the reciepent, and in a valid state', async () => {
    const request = {
      recipientId: 1,
      state: 'SENT',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    const result = await authorizer.canDeclineRequest(100);

    expect(result).toBe(true);
  });
});

describe('canAcceptFriendRequest', () => {
  it('should throw if request not found', async () => {
    mockCtx.prisma.request.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canAcceptRequest(100)).rejects.toThrowError();
  });

  it('should throw if the user is not the recipent of the request', async () => {
    const request = {
      recipientId: 100,
      state: 'SENT',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canAcceptRequest(100)).rejects.toThrowError(
      'You do not have permission to accept this request'
    );
  });

  it('should throw if request is not in SENT', async () => {
    const request = {
      recipientId: 1,
      state: 'ACCEPTED',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canAcceptRequest(100)).rejects.toThrowError(
      'Invalid state'
    );
  });

  it('should return true if the user is the reciepent, and in a valid state', async () => {
    const request = {
      recipientId: 1,
      state: 'SENT',
    } as unknown as Request;
    mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);

    const result = await authorizer.canAcceptRequest(100);

    expect(result).toBe(true);
  });
});

describe('canDeleteFriend', () => {
  it('should throw if user not found', async () => {
    mockCtx.prisma.user.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canDeleteFriend(100)).rejects.toThrowError();
  });

  it('should throw if user is not friends with user', async () => {
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(authorizer.canDeleteFriend(100)).rejects.toThrowError(
      'You are not friends with this user'
    );
  });

  it('should return true if user is friends with user', async () => {
    const user = {
      friends: [{ id: 1 }],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canDeleteFriend(100);

    expect(result).toBe(true);
  });
});
