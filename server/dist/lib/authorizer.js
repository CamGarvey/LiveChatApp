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
exports.Authorizer = void 0;
const graphql_1 = require("graphql");
class Authorizer {
    constructor(_prisma) {
        this._prisma = _prisma;
    }
    canCreateDirectMessageChat(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId == this.currentUserId) {
                throw new graphql_1.GraphQLError('userId can not be currentUserId', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }
            const friend = yield this._prisma.user.findUniqueOrThrow({
                where: {
                    id: userId,
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
                throw new graphql_1.GraphQLError('You are not friends with this user', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canCreateGroupChat(memberIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberIdSet = new Set(memberIds);
            if (memberIdSet.has(this.currentUserId)) {
                memberIdSet.delete(this.currentUserId);
            }
            if (memberIdSet.size !== 0) {
                const user = yield this._prisma.user.findUniqueOrThrow({
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
                    throw new graphql_1.GraphQLError('You are not friends with all of the users provided', {
                        extensions: {
                            code: 'FORBIDDEN',
                        },
                    });
                }
            }
            return true;
        });
    }
    canUpdateGroupChatBasic(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._prisma.chat.findUniqueOrThrow({
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
                throw new graphql_1.GraphQLError('Can not update a direct message chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            const currentUser = chat.members.find((x) => x.userId === this.currentUserId);
            if (!currentUser) {
                throw new graphql_1.GraphQLError('You are not a member of this chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (currentUser.role === 'BASIC') {
                throw new graphql_1.GraphQLError('You are not an admin in this chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canAddMembersToGroupChat(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._prisma.chat.findUniqueOrThrow({
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
                throw new graphql_1.GraphQLError('Can not update a direct message chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            const currentUser = chat.members.find((x) => x.userId === this.currentUserId);
            if (!currentUser) {
                throw new graphql_1.GraphQLError('You are not a member of this chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (currentUser.role === 'BASIC') {
                throw new graphql_1.GraphQLError('You are not an admin in this chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            const memberIdSet = new Set(data.members);
            if (memberIdSet.has(this.currentUserId)) {
                memberIdSet.delete(this.currentUserId);
            }
            if (memberIdSet.size != 0) {
                const user = yield this._prisma.user.findUniqueOrThrow({
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
                    throw new graphql_1.GraphQLError('You are not friends with all of the users provided', {
                        extensions: {
                            code: 'FORBIDDEN',
                        },
                    });
                }
            }
            return true;
        });
    }
    canRemoveMembersFromGroupChat(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._prisma.chat.findUniqueOrThrow({
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
                throw new graphql_1.GraphQLError('Can not update a direct message chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            const currentUser = chat.members.find((x) => x.userId === this.currentUserId);
            if (!currentUser) {
                throw new graphql_1.GraphQLError('You are not a member of this chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (data.members.length === 1 &&
                data.members[0] === this.currentUserId &&
                currentUser.role !== 'OWNER') {
                return true;
            }
            if (currentUser.role === 'BASIC') {
                throw new graphql_1.GraphQLError('You are not an admin in this chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            const memberSet = new Set(data.members);
            if (memberSet.has(chat.createdById)) {
                throw new graphql_1.GraphQLError('You can not remove the owner of the chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (currentUser.role === 'OWNER') {
                return true;
            }
            const adminIds = new Set(chat.members.filter((x) => x.role === 'ADMIN').map((x) => x.userId));
            const adminSet = new Set([...memberSet].filter((x) => adminIds.has(x)));
            if (adminSet.has(this.currentUserId)) {
                adminSet.delete(this.currentUserId);
            }
            if (adminSet.size !== 0) {
                throw new graphql_1.GraphQLError('You can not remove other admins', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canChangeMemberRoles(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._prisma.chat.findUniqueOrThrow({
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
                throw new graphql_1.GraphQLError('Can not update a direct message chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            const currentUser = chat.members.find((x) => x.userId === this.currentUserId);
            if (!currentUser) {
                throw new graphql_1.GraphQLError('You are not a member of this chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (currentUser.role === 'BASIC') {
                throw new graphql_1.GraphQLError('You are not authorized to modify member roles', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            const memberSet = new Set(data.members);
            if (memberSet.has(chat.createdById)) {
                throw new graphql_1.GraphQLError('You can not modify the owners role', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (currentUser.role === 'OWNER') {
                return true;
            }
            const chatAdmins = chat.members.filter((x) => x.role === 'ADMIN');
            const chatAdminsToRemove = new Set(chatAdmins.filter((x) => !memberSet.has(x.userId)));
            return chatAdminsToRemove.size == 0;
        });
    }
    canDeleteChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._prisma.chat.findUniqueOrThrow({
                select: {
                    createdById: true,
                },
                where: {
                    id: chatId,
                },
            });
            if (chat.createdById !== this.currentUserId) {
                throw new graphql_1.GraphQLError('You do not have permission to delete this chat', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canViewChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._prisma.member.findUniqueOrThrow({
                    where: {
                        userId_chatId: {
                            chatId,
                            userId: this.currentUserId,
                        },
                    },
                });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    canCreateEvent(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._prisma.member.findUniqueOrThrow({
                    where: {
                        userId_chatId: {
                            chatId,
                            userId: this.currentUserId,
                        },
                    },
                });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    canViewEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this._prisma.event.findUniqueOrThrow({
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
                throw new graphql_1.GraphQLError('You do not have permission to view this event', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canUpdateEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this._prisma.event.findUniqueOrThrow({
                where: {
                    id: eventId,
                },
            });
            if (event.createdById !== this.currentUserId) {
                throw new graphql_1.GraphQLError('You do not have permission to update this event', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (event.deletedAt) {
                throw new graphql_1.GraphQLError('Event is deleted', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canDeletedEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this._prisma.event.findUniqueOrThrow({
                where: {
                    id: eventId,
                },
            });
            if (event.createdById !== this.currentUserId) {
                throw new graphql_1.GraphQLError('You do not have permission to delete this event', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canSendFriendRequest(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._prisma.user.findUniqueOrThrow({
                where: {
                    id: this.currentUserId,
                },
                select: {
                    friends: {
                        select: {
                            id: true,
                        },
                        where: {
                            id: userId,
                        },
                    },
                },
            });
            if (user.friends.length !== 0) {
                throw new graphql_1.GraphQLError('Already friends with this user', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canCancelRequest(requestId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this._prisma.request.findUniqueOrThrow({
                where: {
                    id: requestId,
                },
            });
            if (request.createdById !== this.currentUserId) {
                throw new graphql_1.GraphQLError('You do not have permission to cancel this request');
            }
            if (['ACCEPTED', 'DECLINED'].includes((_a = request === null || request === void 0 ? void 0 : request.state) !== null && _a !== void 0 ? _a : '')) {
                throw new graphql_1.GraphQLError('Invalid state', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canDeclineRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this._prisma.request.findUniqueOrThrow({
                select: {
                    recipientId: true,
                    state: true,
                },
                where: {
                    id: requestId,
                },
            });
            if (request.recipientId !== this.currentUserId) {
                throw new graphql_1.GraphQLError('You do not have permission to decline this request', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            if (request.state !== 'SENT') {
                throw new graphql_1.GraphQLError('Invalid state', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canAcceptRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this._prisma.request.findUniqueOrThrow({
                select: {
                    recipientId: true,
                    state: true,
                },
                where: {
                    id: requestId,
                },
            });
            if (request.recipientId !== this.currentUserId) {
                throw new graphql_1.GraphQLError('You do not have permission to accept this request');
            }
            if (request.state !== 'SENT') {
                throw new graphql_1.GraphQLError('Invalid state', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
    canDeleteFriend(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._prisma.user.findUniqueOrThrow({
                where: {
                    id: userId,
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
                throw new graphql_1.GraphQLError('You are not friends with this user', {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                });
            }
            return true;
        });
    }
}
exports.Authorizer = Authorizer;
//# sourceMappingURL=authorizer.js.map