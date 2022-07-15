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
exports.DeleteFriendMutation = exports.AcceptFriendRequestMutation = exports.DeclineFriendRequestMutation = exports.CancelFriendRequestMutation = exports.SendFriendRequestMutation = exports.UpdateMeMutation = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
exports.UpdateMeMutation = (0, nexus_1.mutationField)('updateMe', {
    type: 'Me',
    description: 'Update current user',
    args: {
        email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve(_, { email, username }, { userId, prisma }) {
        return prisma.user.update({
            data: {
                email,
                username,
            },
            where: {
                userId,
            },
        });
    },
});
exports.SendFriendRequestMutation = (0, nexus_1.mutationField)('sendFriendRequest', {
    type: 'Stranger',
    description: 'Send a friend request to a user',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                userId,
            },
            include: {
                friends: {
                    where: {
                        userId: friendId,
                    },
                },
                sentFriendRequests: {
                    where: {
                        userId: friendId,
                    },
                },
                receivedFriendRequests: {
                    where: {
                        userId: friendId,
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
                userId: friendId,
            },
            data: {
                receivedFriendRequests: {
                    connect: {
                        userId,
                    },
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestSent, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestReceived, friend);
        return friend;
    }),
});
exports.CancelFriendRequestMutation = (0, nexus_1.mutationField)('cancelFriendRequest', {
    type: 'Stranger',
    description: 'Cancel/Delete a sent Friend Request',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const sentRequests = yield prisma.user
            .findUnique({
            where: {
                userId,
            },
        })
            .sentFriendRequests();
        const friend = sentRequests.find((request) => request.userId == friendId);
        if (!friend) {
            throw new apollo_server_core_1.ForbiddenError('You have no sent requests to this user');
        }
        const user = yield prisma.user.update({
            where: {
                userId,
            },
            data: {
                sentFriendRequests: {
                    disconnect: {
                        userId: friendId,
                    },
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestDeleted, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestDeleted, friend);
        return friend;
    }),
});
exports.DeclineFriendRequestMutation = (0, nexus_1.mutationField)('declineFriendRequest', {
    type: 'Stranger',
    description: 'Delete/Decline a received Friend Request',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const receivedRequests = yield prisma.user
            .findUnique({
            where: {
                userId,
            },
        })
            .receivedFriendRequests();
        const friend = receivedRequests.find((request) => request.userId == friendId);
        if (!friend) {
            throw new apollo_server_core_1.ForbiddenError('You do not have a request from this user');
        }
        const user = yield prisma.user.update({
            where: {
                userId,
            },
            data: {
                receivedFriendRequests: {
                    disconnect: {
                        userId: friendId,
                    },
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestDeleted, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestDeleted, friend);
        return friend;
    }),
});
exports.AcceptFriendRequestMutation = (0, nexus_1.mutationField)('acceptFriendRequest', {
    type: 'Friend',
    description: 'Accept a Users friend request',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve: (_, { friendId }, { prisma, pubsub, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const receivedRequests = yield prisma.user
            .findUnique({
            where: {
                userId,
            },
        })
            .receivedFriendRequests();
        const friend = receivedRequests.find((request) => request.userId == friendId);
        if (!friend) {
            throw new apollo_server_core_1.ForbiddenError('You do not have a request from this user');
        }
        const user = yield prisma.user.update({
            where: {
                userId,
            },
            data: {
                receivedFriendRequests: {
                    disconnect: {
                        userId: friendId,
                    },
                },
                friends: {
                    connect: {
                        userId: friendId,
                    },
                },
                friendsOf: {
                    connect: {
                        userId: friendId,
                    },
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.UserFriendCreated, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendCreated, friend);
        return friend;
    }),
});
exports.DeleteFriendMutation = (0, nexus_1.mutationField)('deleteFriend', {
    type: 'Stranger',
    description: 'Delete a Friend',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                userId,
            },
            include: {
                friends: {
                    where: {
                        userId: friendId,
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
        const newUser = yield prisma.user.update({
            where: {
                userId,
            },
            data: {
                friends: {
                    disconnect: {
                        userId: friendId,
                    },
                },
                friendsOf: {
                    disconnect: {
                        userId: friendId,
                    },
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.UserFriendDeleted, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendDeleted, { id: friendId });
        return newUser;
    }),
});
//# sourceMappingURL=user.mutation.js.map