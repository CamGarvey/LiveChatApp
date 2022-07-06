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
exports.deleteFriend = exports.declineFriendRequest = exports.acceptFriendRequest = exports.cancelFriendRequest = exports.sendFriendRequest = exports.updateUser = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.updateUser = (0, nexus_1.mutationField)('updateUser', {
    type: 'User',
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
    type: 'User',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Send a Friend Request to a User',
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                friends: {
                    where: {
                        id: friendId,
                    },
                },
                sentFriendRequests: {
                    where: {
                        id: friendId,
                    },
                },
                receivedFriendRequests: {
                    where: {
                        id: friendId,
                    },
                },
            },
        });
        if (user == null) {
            throw new apollo_server_core_1.UserInputError('User does not exist');
        }
        if (user.friends.length) {
            throw new apollo_server_core_1.ForbiddenError('Already friends with this user');
        }
        if (user.sentFriendRequests.length) {
            throw new apollo_server_core_1.ForbiddenError('Friend request already sent');
        }
        if (user.receivedFriendRequests.length) {
            throw new apollo_server_core_1.ForbiddenError('You have a request from this user');
        }
        const friend = yield prisma.user.update({
            where: {
                id: friendId,
            },
            data: {
                receivedFriendRequests: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        pubsub.publish(subscriptions_enum_1.Subscription.FriendRequestCreated, {
            sender: user,
            receiverId: friendId,
        });
        pubsub.publish(subscriptions_enum_1.Subscription.MeChanged, friend);
        return friend;
    }),
});
exports.cancelFriendRequest = (0, nexus_1.mutationField)('cancelFriendRequest', {
    type: 'User',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Cancel/Delete a sent Friend Request',
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const sentRequests = yield prisma.user
            .findUnique({
            where: {
                id: userId,
            },
        })
            .sentFriendRequests();
        const friend = sentRequests.find((request) => request.id == friendId);
        if (!friend) {
            throw new apollo_server_core_1.ForbiddenError('You have no sent requests to this user');
        }
        const user = yield prisma.user.update({
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
        pubsub.publish(subscriptions_enum_1.Subscription.FriendRequestDeleted, {
            sender: user,
            receiverId: friendId,
        });
        pubsub.publish(subscriptions_enum_1.Subscription.MeChanged, friend);
        return friend;
    }),
});
exports.acceptFriendRequest = (0, nexus_1.mutationField)('acceptFriendRequest', {
    type: 'User',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
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
        const friend = receivedRequests.find((request) => request.id == friendId);
        if (!friend) {
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
        pubsub.publish(subscriptions_enum_1.Subscription.FriendCreated, {
            senderId: friendId,
            receiver: user,
        });
        return friend;
    }),
});
exports.declineFriendRequest = (0, nexus_1.mutationField)('declineFriendRequest', {
    type: 'User',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Delete/Decline a received Friend Request',
    resolve: (_, { friendId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const receivedRequests = yield prisma.user
            .findUnique({
            where: {
                id: userId,
            },
        })
            .receivedFriendRequests();
        const friend = receivedRequests.find((request) => request.id == friendId);
        if (!friend) {
            throw new apollo_server_core_1.ForbiddenError('You do not have a request from this user');
        }
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
        return friend;
    }),
});
exports.deleteFriend = (0, nexus_1.mutationField)('deleteFriend', {
    type: 'User',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Delete a Friend',
    resolve: (_, { friendId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                friends: {
                    where: {
                        id: friendId,
                    },
                },
            },
        });
        if (user == null) {
            throw new Error('User does not exist');
        }
        if (user.friends.length == 0) {
            throw new Error('You are not friends with this user');
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
        return user.friends[0];
    }),
});
//# sourceMappingURL=user.mutation.js.map