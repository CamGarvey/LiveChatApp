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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriend = exports.declineFriendRequest = exports.acceptFriendRequest = exports.cancelFriendRequest = exports.sendFriendRequest = exports.updateUser = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const subscriptions_1 = require("../types/subscriptions");
const user_1 = __importDefault(require("../types/user"));
exports.updateUser = (0, nexus_1.mutationField)('updateUser', {
    type: user_1.default,
    args: {
        email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Update current User',
    resolve(_, { email, username }, { userId, prisma }) {
        return prisma.user.update({
            data: {
                email,
                username,
            },
            where: {
                id: userId,
            },
        });
    },
});
exports.sendFriendRequest = (0, nexus_1.mutationField)('sendFriendRequest', {
    type: 'Boolean',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Send a Friend Request to a User',
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: {
                id: userId,
                AND: [
                    {
                        friends: {
                            none: { id: friendId },
                        },
                        sentFriendRequests: {
                            none: { id: friendId },
                        },
                        receivedFriendRequests: {
                            none: { id: friendId },
                        },
                    },
                ],
            },
        });
        if (user == null) {
            throw new apollo_server_core_1.UserInputError('User does not exist, already friends, request already sent or request already received');
        }
        yield prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                sentFriendRequests: {
                    connect: {
                        id: friendId,
                    },
                },
            },
        });
        pubsub.publish(subscriptions_1.Subscriptions.NEW_FRIEND_REQUEST, {
            receiverId: friendId,
            sender: user,
        });
        return true;
    }),
});
exports.cancelFriendRequest = (0, nexus_1.mutationField)('cancelFriendRequest', {
    type: 'Boolean',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Cancel/Delete a sent Friend Request',
    resolve: (_, { friendId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                sentFriendRequests: {
                    disconnect: {
                        id: friendId,
                    },
                },
            },
        });
        return true;
    }),
});
exports.acceptFriendRequest = (0, nexus_1.mutationField)('acceptFriendRequest', {
    type: 'Boolean',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Accept a Users friend request',
    resolve: (_, { friendId }, { prisma, pubsub, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const receivedRequests = yield prisma.user
            .findUnique({
            where: {
                id: userId,
            },
        })
            .receivedFriendRequests();
        if (!receivedRequests.find((request) => request.id == friendId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have a request from this user');
        }
        const user = yield prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                receivedFriendRequests: {
                    disconnect: {
                        id: friendId,
                    },
                },
                friends: {
                    connect: {
                        id: friendId,
                    },
                },
            },
        });
        pubsub.publish(subscriptions_1.Subscriptions.NEW_FRIEND, {
            senderId: friendId,
            receiver: user,
        });
        return true;
    }),
});
exports.declineFriendRequest = (0, nexus_1.mutationField)('declineFriendRequest', {
    type: 'Boolean',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete/Decline a received Friend Request',
    resolve: (_, { friendId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                receivedFriendRequests: {
                    disconnect: {
                        id: friendId,
                    },
                },
            },
        });
        return true;
    }),
});
exports.deleteFriend = (0, nexus_1.mutationField)('deleteFriend', {
    type: 'Boolean',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete a Friend',
    resolve: (_, { friendId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findFirst({
            where: {
                id: userId,
                AND: [
                    {
                        friends: {
                            some: { id: friendId },
                        },
                    },
                ],
            },
        });
        if (user == null) {
            throw new Error('User does not exist or not friends');
        }
        yield prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                friends: {
                    disconnect: {
                        id: friendId,
                    },
                },
                friendsOf: {
                    disconnect: {
                        id: friendId,
                    },
                },
            },
        });
        return true;
    }),
});
//# sourceMappingURL=user.mutation.js.map