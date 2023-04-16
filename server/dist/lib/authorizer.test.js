"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../context");
const authorizer_1 = require("./authorizer");
let mockCtx;
let authorizer;
beforeEach(() => {
    mockCtx = (0, context_1.createMockContext)();
    const prisma = mockCtx.prisma;
    authorizer = new authorizer_1.Authorizer(prisma);
    authorizer.currentUserId = 1;
});
describe('canCreateDirectMessageChat', () => {
    it('should throw if friendId is same as userId', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authorizer.canCreateDirectMessageChat(1)).rejects.toThrowError('friendId can not be own user');
        expect(mockCtx.prisma.user.findUniqueOrThrow).not.toBeCalled();
    }));
    it('should throw if friend not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.user.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canCreateDirectMessageChat(100)).rejects.toThrowError();
    }));
    it('should throw if user is not friends with the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canCreateDirectMessageChat(100)).rejects.toThrowError('You are not friends with this user');
    }));
    it('should return true if friends with user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            friends: [
                {
                    id: 1,
                },
            ],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        const result = yield authorizer.canCreateDirectMessageChat(100);
        expect(result).toBe(true);
    }));
});
describe('canCreateGroupChat', () => {
    it('should return true if not members to add', () => __awaiter(void 0, void 0, void 0, function* () {
        const members = [];
        const result = yield authorizer.canCreateGroupChat(members);
        expect(result).toBe(true);
    }));
    it('should return true if only member to add is the current user', () => __awaiter(void 0, void 0, void 0, function* () {
        const members = [1];
        const result = yield authorizer.canCreateGroupChat(members);
        expect(result).toBe(true);
    }));
    it('should throw if can not find user', () => __awaiter(void 0, void 0, void 0, function* () {
        const members = [100];
        mockCtx.prisma.user.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canCreateGroupChat(members)).rejects.toThrowError();
    }));
    it('should throw if not friends with all of the users', () => __awaiter(void 0, void 0, void 0, function* () {
        const members = [100];
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canCreateGroupChat(members)).rejects.toThrowError('You are not friends with all of the users provided');
    }));
    it('should return true if friends with all of the users', () => __awaiter(void 0, void 0, void 0, function* () {
        const members = [100, 200];
        const user = {
            friends: [{ id: 100 }, { id: 200 }],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        const result = yield authorizer.canCreateGroupChat(members);
        expect(result).toBe(true);
    }));
    it('should not include current user in prisma query', () => __awaiter(void 0, void 0, void 0, function* () {
        const members = [1, 100, 200];
        const user = {
            friends: [{ id: 100 }, { id: 200 }],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        const result = yield authorizer.canCreateGroupChat(members);
        expect(result).toBe(true);
    }));
    it('should not include duplicate users in prisma query', () => __awaiter(void 0, void 0, void 0, function* () {
        const members = [1, 100, 200, 200, 200, 100];
        const user = {
            friends: [{ id: 100 }, { id: 200 }],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        const result = yield authorizer.canCreateGroupChat(members);
        expect(result).toBe(true);
    }));
});
describe('canRemoveMembersFromGroupChat', () => {
    it('should throw if chat is DM', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'DIRECT_MESSAGE',
            members: [
                { userId: authorizer.currentUserId, role: 'ADMIN' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canRemoveMembersFromGroupChat({ chatId: 100, members: [2] })).rejects.toThrowError('Can not update a direct message chat');
    }));
    it('should throw if user is not an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'GROUP',
            members: [
                { userId: authorizer.currentUserId, role: 'BASIC' },
                { userId: 10, role: 'OWNER' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canRemoveMembersFromGroupChat({ chatId: 100, members: [2] })).rejects.toThrowError('You are not an admin in this chat');
    }));
    it('should throw if user is not creator and removing admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'GROUP',
            members: [
                { userId: authorizer.currentUserId, role: 'ADMIN' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canRemoveMembersFromGroupChat({ chatId: 100, members: [2] })).rejects.toThrowError('You can not remove other admins');
    }));
    it('should return true if user is creator and removing admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'GROUP',
            members: [
                { userId: authorizer.currentUserId, role: 'OWNER' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        const result = yield authorizer.canRemoveMembersFromGroupChat({
            chatId: 100,
            members: [2],
        });
        expect(result).toBe(true);
    }));
});
describe('canAddMembersToGroupChat', () => {
    it('should throw if chat is DM', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'DIRECT_MESSAGE',
            members: [
                { userId: authorizer.currentUserId, role: 'ADMIN' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canAddMembersToGroupChat({ chatId: 100, members: [2] })).rejects.toThrowError('Can not update a direct message chat');
    }));
    it('should throw if user is not an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'GROUP',
            members: [
                { userId: authorizer.currentUserId, role: 'BASIC' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canAddMembersToGroupChat({ chatId: 100, members: [2] })).rejects.toThrowError('You are not an admin in this chat');
    }));
    it('should throw if adding a stranger', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'GROUP',
            members: [
                { userId: authorizer.currentUserId, role: 'ADMIN' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canAddMembersToGroupChat({ chatId: 100, members: [3] })).rejects.toThrowError('You are not friends with all of the users provided');
    }));
});
describe('canUpdateGroupChatBasic', () => {
    it('should throw if chat is DM', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'DIRECT_MESSAGE',
            members: [
                { userId: authorizer.currentUserId, role: 'ADMIN' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canUpdateGroupChatBasic({ chatId: 100 })).rejects.toThrowError('Can not update a direct message chat');
    }));
    it('should throw if user is not an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'GROUP',
            members: [
                { userId: authorizer.currentUserId, role: 'BASIC' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canUpdateGroupChatBasic({ chatId: 100 })).rejects.toThrowError('You are not an admin in this chat');
    }));
    it('should return true if user is an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            type: 'GROUP',
            members: [
                { userId: authorizer.currentUserId, role: 'ADMIN' },
                { userId: 2, role: 'ADMIN' },
            ],
            createdById: 10,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        const result = yield authorizer.canUpdateGroupChatBasic({ chatId: 100 });
        expect(result).toBe(true);
    }));
});
describe('canDeleteChat', () => {
    it('should throw if chat not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.chat.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canDeleteChat(100)).rejects.toThrowError();
    }));
    it('should throw if user does not own the chat', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            createdById: 2,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        yield expect(authorizer.canDeleteChat(100)).rejects.toThrowError('You do not have permission to delete this chat');
    }));
    it('should return true if user owns chat', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            createdById: 1,
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const result = yield authorizer.canDeleteChat(100);
        expect(result).toBe(true);
    }));
});
describe('canViewChat', () => {
    it('should throw if member not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.member.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canViewChat(100)).rejects.toThrowError();
    }));
    it('should return true if user is a member of the chat', () => __awaiter(void 0, void 0, void 0, function* () {
        const member = {
            userId: 1,
        };
        mockCtx.prisma.member.findUniqueOrThrow.mockResolvedValue(member);
        const result = yield authorizer.canViewChat(100);
        expect(result).toBe(true);
    }));
});
describe('canCreateMessage', () => {
    it('should throw if chat not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.chat.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canCreateEvent(100)).rejects.toThrowError();
    }));
    it('should throw if user is not a member of the chat', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            members: [],
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        yield expect(authorizer.canCreateEvent(100)).rejects.toThrowError('You are not a member of this chat');
    }));
    it('should return true if user is a member of the chat', () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = {
            members: [{ id: 1 }],
        };
        mockCtx.prisma.chat.findUniqueOrThrow.mockResolvedValue(chat);
        const result = yield authorizer.canCreateEvent(100);
        expect(result).toBe(true);
    }));
});
describe('canViewEvent', () => {
    it('should throw if event not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.message.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canViewEvent(100)).rejects.toThrowError();
    }));
    it('should throw if not member of the chat event was created in', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            createdById: 300,
            chat: {
                members: [],
            },
        };
        mockCtx.prisma.event.findUniqueOrThrow.mockResolvedValue(event);
        yield expect(authorizer.canViewEvent(100)).rejects.toThrowError('You do not have permission to view this event');
    }));
    it('should return true if user is a member of the chat event is created in', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            createdById: 300,
            chat: {
                members: [{ id: 1 }],
            },
        };
        mockCtx.prisma.event.findUniqueOrThrow.mockResolvedValue(event);
        const result = yield authorizer.canViewEvent(100);
        expect(result).toBe(true);
    }));
});
describe('canUpdateEvent', () => {
    it('should throw if event not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.message.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canUpdateEvent(100)).rejects.toThrowError();
    }));
    it('should throw if the user is not the creator of the event', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            createdById: 300,
        };
        mockCtx.prisma.event.findUniqueOrThrow.mockResolvedValue(event);
        yield expect(authorizer.canUpdateEvent(100)).rejects.toThrowError('You do not have permission to update this event');
    }));
    it('should throw if the event is deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            createdById: 1,
            deletedAt: new Date(),
        };
        mockCtx.prisma.event.findUniqueOrThrow.mockResolvedValue(event);
        yield expect(authorizer.canUpdateEvent(100)).rejects.toThrowError('Event is deleted');
    }));
    it('should return true if user is the creator and the event is not deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            createdById: 1,
            deletedAt: null,
        };
        mockCtx.prisma.event.findUniqueOrThrow.mockResolvedValue(event);
        const result = yield authorizer.canUpdateEvent(100);
        expect(result).toBe(true);
    }));
});
describe('canDeletedEvent', () => {
    it('should throw if event not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.event.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canDeletedEvent(100)).rejects.toThrowError();
    }));
    it('should throw if the user is not the creator of the event', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            createdById: 300,
        };
        mockCtx.prisma.event.findUniqueOrThrow.mockResolvedValue(event);
        yield expect(authorizer.canDeletedEvent(100)).rejects.toThrowError('You do not have permission to delete this event');
    }));
    it('should return true if user is the creator', () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            createdById: 1,
            deletedAt: null,
        };
        mockCtx.prisma.event.findUniqueOrThrow.mockResolvedValue(event);
        const result = yield authorizer.canDeletedEvent(100);
        expect(result).toBe(true);
    }));
});
describe('canSendFriendRequest', () => {
    it('should throw if friend not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.user.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canSendFriendRequest(100)).rejects.toThrowError();
    }));
    it('should throw if already friends with the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            friends: [{ id: 100 }],
            requests: [],
            sentRequests: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canSendFriendRequest(100)).rejects.toThrowError('Already friends with this user');
    }));
    it('should return true if not friends with user, and not pending requests', () => __awaiter(void 0, void 0, void 0, function* () {
        const friend = {
            friends: [],
            requests: [],
            sentRequests: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(friend);
        const result = yield authorizer.canSendFriendRequest(100);
        expect(result).toBe(true);
    }));
});
describe('canCancelRequest', () => {
    it('should throw if request not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.request.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canCancelRequest(100)).rejects.toThrowError();
    }));
    it('should throw if user is not the creator of the request', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            createdById: 100,
            state: 'SENT',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        yield expect(authorizer.canCancelRequest(100)).rejects.toThrowError('You do not have permission to cancel this request');
    }));
    it('should throw if request is not in a pending state (SEEN or SENT)', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            createdById: 1,
            state: 'ACCEPTED',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        yield expect(authorizer.canCancelRequest(100)).rejects.toThrowError('Invalid state');
    }));
    it('should return true if the request is created by current user and SENT state', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            createdById: 1,
            state: 'SENT',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        const result = yield authorizer.canCancelRequest(100);
        expect(result).toBe(true);
    }));
});
describe('canDeclineRequest', () => {
    it('should throw if request not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.request.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canDeclineRequest(100)).rejects.toThrowError();
    }));
    it('should throw if the user is not the recipent of the request', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            recipientId: 100,
            state: 'SENT',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        yield expect(authorizer.canDeclineRequest(100)).rejects.toThrowError('You do not have permission to decline this request');
    }));
    it('should throw if request is not in SENT state', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            recipientId: 1,
            state: 'ACCEPTED',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        yield expect(authorizer.canDeclineRequest(100)).rejects.toThrowError('Invalid state');
    }));
    it('should return true if the user is the reciepent, and in a valid state', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            recipientId: 1,
            state: 'SENT',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        const result = yield authorizer.canDeclineRequest(100);
        expect(result).toBe(true);
    }));
});
describe('canAcceptRequest', () => {
    it('should throw if request not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.request.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canAcceptRequest(100)).rejects.toThrowError();
    }));
    it('should throw if the user is not the recipent of the request', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            recipientId: 100,
            state: 'SENT',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        yield expect(authorizer.canAcceptRequest(100)).rejects.toThrowError('You do not have permission to accept this request');
    }));
    it('should throw if request is not in SENT', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            recipientId: 1,
            state: 'ACCEPTED',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        yield expect(authorizer.canAcceptRequest(100)).rejects.toThrowError('Invalid state');
    }));
    it('should return true if the user is the reciepent, and in a valid state', () => __awaiter(void 0, void 0, void 0, function* () {
        const request = {
            recipientId: 1,
            state: 'SENT',
        };
        mockCtx.prisma.request.findUniqueOrThrow.mockResolvedValue(request);
        const result = yield authorizer.canAcceptRequest(100);
        expect(result).toBe(true);
    }));
});
describe('canDeleteFriend', () => {
    it('should throw if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCtx.prisma.user.findUniqueOrThrow.mockRejectedValue(new Error());
        yield expect(authorizer.canDeleteFriend(100)).rejects.toThrowError();
    }));
    it('should throw if user is not friends with user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            friends: [],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect(authorizer.canDeleteFriend(100)).rejects.toThrowError('You are not friends with this user');
    }));
    it('should return true if user is friends with user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            friends: [{ id: 1 }],
        };
        mockCtx.prisma.user.findUniqueOrThrow.mockResolvedValue(user);
        const result = yield authorizer.canDeleteFriend(100);
        expect(result).toBe(true);
    }));
});
//# sourceMappingURL=authorizer.test.js.map