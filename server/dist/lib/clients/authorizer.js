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
const apollo_server_core_1 = require("apollo-server-core");
class Authorizer {
    constructor(_prisma) {
        this._prisma = _prisma;
    }
    canCreateDirectMessageChat(friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (friendId == this.userId) {
                throw new apollo_server_core_1.UserInputError('friendId can not be null or own user');
            }
            const friend = yield this._prisma.user.findUnique({
                where: {
                    userId: friendId,
                },
                include: {
                    friends: {
                        where: {
                            userId: this.userId,
                        },
                    },
                },
            });
            if (!friend) {
                throw new apollo_server_core_1.ForbiddenError('User does not exist');
            }
            if (friend.friends.length == 0) {
                throw new apollo_server_core_1.ForbiddenError('You are not friends with this user');
            }
            return true;
        });
    }
    canCreateGroupChat(memberIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberIdSet = new Set(memberIds);
            if (memberIdSet.has(this.userId)) {
                memberIdSet.delete(this.userId);
            }
            if (memberIdSet) {
                const user = yield this._prisma.user.findUnique({
                    where: {
                        userId: this.userId,
                    },
                    select: {
                        friends: {
                            where: {
                                userId: {
                                    in: memberIds,
                                },
                            },
                        },
                    },
                });
                if (user.friends.length != memberIdSet.size) {
                    throw new apollo_server_core_1.ForbiddenError('You are not friends with all of the users provided');
                }
            }
            return true;
        });
    }
    canViewChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._prisma.user.findUnique({
                select: {
                    memberOfChats: {
                        where: {
                            chatId,
                        },
                    },
                },
                where: {
                    userId: this.userId,
                },
            });
            return user.memberOfChats.length !== 0;
        });
    }
    canAddMembersToChat(chatId, memberIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._prisma.chat.findUnique({
                where: {
                    chatId,
                },
                include: {
                    admins: {
                        select: {
                            userId: true,
                            friends: {
                                select: {
                                    userId: true,
                                },
                                where: {
                                    userId: {
                                        in: memberIds,
                                    },
                                },
                            },
                        },
                        where: {
                            userId: this.userId,
                        },
                    },
                },
            });
            if (!(chat === null || chat === void 0 ? void 0 : chat.admins.length)) {
                return false;
            }
            if (!chat.admins[0].friends.length) {
                return false;
            }
            return true;
        });
    }
    canRemoveMembersFromChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._prisma.chat.findUnique({
                where: {
                    chatId,
                },
                include: {
                    admins: {
                        where: {
                            userId: this.userId,
                        },
                    },
                },
            });
            if (!(chat === null || chat === void 0 ? void 0 : chat.admins.length) && chat.isDM)
                return false;
            return true;
        });
    }
}
exports.Authorizer = Authorizer;
//# sourceMappingURL=authorizer.js.map