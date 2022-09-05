import {
  Chat,
  FriendRequest,
  Message,
  PrismaClient,
  User,
} from '@prisma/client';
import { MockContext, createMockContext } from '../context';
import { Authorizer } from './authorizer';

let mockCtx: MockContext;
let authorizer: Authorizer;

beforeEach(() => {
  mockCtx = createMockContext();
  const prisma = mockCtx.prisma as unknown as PrismaClient;
  authorizer = new Authorizer(prisma);
  authorizer.userId = 1;
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
    expect(mockCtx.prisma.user.findUniqueOrThrow).toBeCalledWith({
      where: {
        id: 1,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
          where: {
            id: {
              in: [100, 200],
            },
          },
        },
      },
    });
  });

  it('should not include duplicate users in prisma query', async () => {
    const members: number[] = [1, 100, 200, 200, 200, 100];
    const user = {
      friends: [{ id: 100 }, { id: 200 }],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canCreateGroupChat(members);

    expect(result).toBe(true);
    expect(mockCtx.prisma.user.findUniqueOrThrow).toBeCalledWith({
      where: {
        id: 1,
      },
      select: {
        friends: {
          select: {
            id: true,
          },
          where: {
            id: {
              in: [100, 200],
            },
          },
        },
      },
    });
  });
});

describe('canAddAdminsToGroupChat', () => {
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
      authorizer.canAddAdminsToGroupChat({ chatId: 100, members: [2] })
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
      authorizer.canAddAdminsToGroupChat({ chatId: 100, members: [2] })
    ).rejects.toThrowError('You are not an admin in this chat');
  });

  it('should throw if adding admins not friends with and not in chat', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }],
      members: [{ id: 1 }],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    await expect(
      authorizer.canAddAdminsToGroupChat({ chatId: 100, members: [3] })
    ).rejects.toThrowError();
  });

  it('should return true if adding friend as admin that is already in chat', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }],
      members: [{ id: 2 }],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [{ id: 2 }],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canAddAdminsToGroupChat({
      chatId: 100,
      members: [2],
    });

    expect(result).toBe(true);
  });

  it('should return true if adding friend as admin that is not in chat', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }],
      members: [{ id: 1 }],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [{ id: 2 }],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canAddAdminsToGroupChat({
      chatId: 100,
      members: [2],
    });

    expect(result).toBe(true);
  });
});

describe('canRemoveAdminsFromGroupChat', () => {
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
      authorizer.canRemoveAdminsFromGroupChat({ chatId: 100, members: [2] })
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
      authorizer.canRemoveAdminsFromGroupChat({ chatId: 100, members: [2] })
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
      authorizer.canRemoveAdminsFromGroupChat({ chatId: 100, members: [2] })
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

    const result = await authorizer.canRemoveAdminsFromGroupChat({
      chatId: 100,
      members: [2],
    });

    expect(result).toBe(true);
  });

  it('should return true if user is creator and removing non admins', async () => {
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

    const result = await authorizer.canRemoveAdminsFromGroupChat({
      chatId: 100,
      members: [10],
    });

    expect(result).toBe(true);
  });

  it('should return true if user is not creator and removing non admins', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }, { id: 2 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 2,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canRemoveAdminsFromGroupChat({
      chatId: 100,
      members: [10],
    });

    expect(result).toBe(true);
  });

  it('should return true if user is not creator and is removing self as admin', async () => {
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

    const result = await authorizer.canRemoveAdminsFromGroupChat({
      chatId: 100,
      members: [1],
    });

    expect(result).toBe(true);
  });

  it('should return true if removing another admin from admins and is creator', async () => {
    const chat = {
      isDM: false,
      admins: [{ id: 1 }, { id: 2 }, { id: 10 }],
      members: [{ id: 1 }, { id: 2 }, { id: 10 }],
      createdById: 1,
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
    const user = {
      friends: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);

    const result = await authorizer.canRemoveAdminsFromGroupChat({
      chatId: 100,
      members: [2],
    });

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
    expect(mockCtx.prisma.chat.findUniqueOrThrow).toBeCalledWith({
      select: {
        createdById: true,
      },
      where: {
        id: 100,
      },
    });
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
    expect(mockCtx.prisma.chat.findUniqueOrThrow).toBeCalledWith({
      where: {
        id: 100,
      },
      select: {
        members: {
          select: {
            id: true,
          },
          where: {
            id: 1,
          },
        },
      },
    });
  });
});

describe('canCreateMessage', () => {
  it('should throw if chat not found', async () => {
    mockCtx.prisma.chat.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canCreateMessage(100)).rejects.toThrowError();
  });

  it('should throw if user is not a member of the chat', async () => {
    const chat = {
      members: [],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);

    await expect(authorizer.canCreateMessage(100)).rejects.toThrowError(
      'You are not a member of this chat'
    );
  });

  it('should return true if user is a member of the chat', async () => {
    const chat = {
      members: [{ id: 1 }],
    } as unknown as Chat;
    mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);

    const result = await authorizer.canCreateMessage(100);

    expect(result).toBe(true);
    expect(mockCtx.prisma.chat.findUniqueOrThrow).toBeCalledWith({
      select: {
        members: {
          select: {
            id: true,
          },
          where: {
            id: 1,
          },
        },
      },
      where: {
        id: 100,
      },
    });
  });
});

describe('canViewMessage', () => {
  it('should throw if message not found', async () => {
    mockCtx.prisma.message.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canViewMessage(100)).rejects.toThrowError();
  });

  it('should throw if not member of the chat message was created in', async () => {
    const message = {
      createdById: 300,
      chat: {
        members: [],
      },
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    await expect(authorizer.canViewMessage(100)).rejects.toThrowError(
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

    const result = await authorizer.canViewMessage(100);

    expect(result).toBe(true);
    expect(mockCtx.prisma.message.findUniqueOrThrow).toBeCalledWith({
      where: {
        id: 100,
      },
      select: {
        chat: {
          select: {
            members: {
              select: {
                id: true,
              },
              where: {
                id: 1,
              },
            },
          },
        },
      },
    });
  });
});

describe('canUpdateMessage', () => {
  it('should throw if message not found', async () => {
    mockCtx.prisma.message.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canUpdateMessage(100)).rejects.toThrowError();
  });

  it('should throw if the user is not the creator of the message', async () => {
    const message = {
      createdById: 300,
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    await expect(authorizer.canUpdateMessage(100)).rejects.toThrowError(
      'You do not have permission to update this message'
    );
  });

  it('should throw if the message is deleted', async () => {
    const message = {
      createdById: 1,
      deletedAt: new Date(),
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    await expect(authorizer.canUpdateMessage(100)).rejects.toThrowError(
      'Message is deleted'
    );
  });

  it('should return true if user is the creator and the message is not deleted', async () => {
    const message = {
      createdById: 1,
      deletedAt: null,
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    const result = await authorizer.canUpdateMessage(100);

    expect(result).toBe(true);
    expect(mockCtx.prisma.message.findUniqueOrThrow).toBeCalledWith({
      where: {
        id: 100,
      },
    });
  });
});

describe('canDeletedMessage', () => {
  it('should throw if message not found', async () => {
    mockCtx.prisma.message.findUniqueOrThrow.mockRejectedValue(new Error());

    await expect(authorizer.canDeletedMessage(100)).rejects.toThrowError();
  });

  it('should throw if the user is not the creator of the message', async () => {
    const message = {
      createdById: 300,
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    await expect(authorizer.canDeletedMessage(100)).rejects.toThrowError(
      'You do not have permission to delete this message'
    );
  });

  it('should return true if user is the creator', async () => {
    const message = {
      createdById: 1,
      deletedAt: null,
    } as unknown as Message;
    mockCtx.prisma.message.findUniqueOrThrow.mockResolvedValue(message);

    const result = await authorizer.canDeletedMessage(100);

    expect(result).toBe(true);
    expect(mockCtx.prisma.message.findUniqueOrThrow).toBeCalledWith({
      where: {
        id: 100,
      },
    });
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

  it('should throw if there is a pending (SENT or SEEN) friend request sent', async () => {
    const friend = {
      friends: [],
      receivedFriendRequests: [{ id: 100 }],
      sentFriendRequests: [],
    } as unknown as User;
    mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(friend);

    await expect(authorizer.canSendFriendRequest(100)).rejects.toThrowError(
      'Already sent a friend request to this user'
    );
  });

  it('should throw if there is a pending (SENT or SEEN) friend request received', async () => {
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
    expect(mockCtx.prisma.user.findUniqueOrThrow).toBeCalledWith({
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
        sentFriendRequests: {
          select: {
            id: true,
          },
          where: {
            recipientId: 1,
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
            createdById: 1,
            status: {
              in: ['SEEN', 'SENT'],
            },
          },
        },
      },
    });
  });
});

describe('canCancelFriendRequest', () => {
  it('should throw if friend request not found', async () => {
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockRejectedValue(
      new Error()
    );

    await expect(authorizer.canCancelFriendRequest(100)).rejects.toThrowError();
  });

  it('should throw if user is not the creator of the friend request', async () => {
    const request = {
      createdById: 100,
      status: 'SENT',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canCancelFriendRequest(100)).rejects.toThrowError(
      'You do not have permission to cancel this friend request'
    );
  });

  it('should throw if friend request is not in a pending status (SEEN or SENT)', async () => {
    const request = {
      createdById: 1,
      status: 'ACCEPTED',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canCancelFriendRequest(100)).rejects.toThrowError(
      'Invalid state'
    );
  });

  it('should return true if the friend request is created by current user and in a pending status', async () => {
    const request = {
      createdById: 1,
      status: 'SENT',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    const result = await authorizer.canCancelFriendRequest(100);

    expect(result).toBe(true);
    expect(mockCtx.prisma.friendRequest.findUniqueOrThrow).toBeCalledWith({
      select: {
        createdById: true,
        status: true,
      },
      where: {
        id: 100,
      },
    });
  });
});

describe('canDeclineFriendRequest', () => {
  it('should throw if friend request not found', async () => {
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockRejectedValue(
      new Error()
    );

    await expect(
      authorizer.canDeclineFriendRequest(100)
    ).rejects.toThrowError();
  });

  it('should throw if the user is not the recipent of the friend request', async () => {
    const request = {
      recipientId: 100,
      status: 'SENT',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canDeclineFriendRequest(100)).rejects.toThrowError(
      'You do not have permission to decline this friend request'
    );
  });

  it('should throw if friend request is not in a pending status (SEEN or SENT)', async () => {
    const request = {
      recipientId: 1,
      status: 'ACCEPTED',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canDeclineFriendRequest(100)).rejects.toThrowError(
      'Invalid state'
    );
  });

  it('should return true if the user is the reciepent, and in a valid status', async () => {
    const request = {
      recipientId: 1,
      status: 'SENT',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    const result = await authorizer.canDeclineFriendRequest(100);

    expect(result).toBe(true);
    expect(mockCtx.prisma.friendRequest.findUniqueOrThrow).toBeCalledWith({
      select: {
        recipientId: true,
        status: true,
      },
      where: {
        id: 100,
      },
    });
  });
});

describe('canAcceptFriendRequest', () => {
  it('should throw if friend request not found', async () => {
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockRejectedValue(
      new Error()
    );

    await expect(authorizer.canAcceptFriendRequest(100)).rejects.toThrowError();
  });

  it('should throw if the user is not the recipent of the friend request', async () => {
    const request = {
      recipientId: 100,
      status: 'SENT',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canAcceptFriendRequest(100)).rejects.toThrowError(
      'You do not have permission to accept this friend request'
    );
  });

  it('should throw if friend request is not in a pending status (SEEN or SENT)', async () => {
    const request = {
      recipientId: 1,
      status: 'ACCEPTED',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    await expect(authorizer.canAcceptFriendRequest(100)).rejects.toThrowError(
      'Invalid state'
    );
  });

  it('should return true if the user is the reciepent, and in a valid status', async () => {
    const request = {
      recipientId: 1,
      status: 'SENT',
    } as unknown as FriendRequest;
    mockCtx.prisma.friendRequest.findUniqueOrThrow.mockResolvedValue(request);

    const result = await authorizer.canAcceptFriendRequest(100);

    expect(result).toBe(true);
    expect(mockCtx.prisma.friendRequest.findUniqueOrThrow).toBeCalledWith({
      select: {
        recipientId: true,
        status: true,
      },
      where: {
        id: 100,
      },
    });
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
    expect(mockCtx.prisma.user.findUniqueOrThrow).toBeCalledWith({
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
      },
    });
  });
});
