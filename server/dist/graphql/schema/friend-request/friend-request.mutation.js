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
exports.AcceptFriendRequestMutation = exports.DeclineFriendRequestMutation = exports.CancelFriendRequestMutation = exports.SendFriendRequestMutation = void 0;
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
const shared_1 = require("../shared");
exports.SendFriendRequestMutation = (0, nexus_1.mutationField)('sendFriendRequest', {
    type: 'FriendRequest',
    description: 'Send a friend request to a user',
    args: {
        friendId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { friendId }, { auth }) => auth.canSendFriendRequest(friendId),
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield prisma.friendRequest.upsert({
            create: {
                recipientId: friendId,
                createdById: userId,
            },
            update: {
                status: 'SENT',
                createdAt: new Date().toISOString(),
                recipientId: friendId,
                createdById: userId,
            },
            where: {
                recipientId_createdById: {
                    recipientId: friendId,
                    createdById: userId,
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.FriendRequestSent, {
            recipients: [friendId],
            content: request,
        });
        return request;
    }),
});
exports.CancelFriendRequestMutation = (0, nexus_1.mutationField)('cancelFriendRequest', {
    type: 'FriendRequest',
    description: 'Cancel/Delete a sent Friend Request',
    args: {
        friendRequestId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { friendRequestId }, { auth }) => auth.canCancelFriendRequest(friendRequestId),
    resolve: (_, { friendRequestId }, { prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield prisma.friendRequest.update({
            where: {
                id: friendRequestId,
            },
            data: {
                status: 'CANCELLED',
            },
        });
        pubsub.publish(backing_types_1.Subscription.FriendRequestCancelled, {
            recipients: [request.recipientId],
            content: request,
        });
        return request;
    }),
});
exports.DeclineFriendRequestMutation = (0, nexus_1.mutationField)('declineFriendRequest', {
    type: 'FriendRequest',
    description: 'Decline a received Friend Request',
    args: {
        friendRequestId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { friendRequestId }, { auth }) => auth.canDeclineFriendRequest(friendRequestId),
    resolve: (_, { friendRequestId }, { prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield prisma.friendRequest.update({
            where: {
                id: friendRequestId,
            },
            data: {
                status: 'DECLINED',
            },
        });
        pubsub.publish(backing_types_1.Subscription.FriendRequestDeclined, {
            recipients: [request.createdById],
            content: request,
        });
        return request;
    }),
});
exports.AcceptFriendRequestMutation = (0, nexus_1.mutationField)('acceptFriendRequest', {
    type: 'FriendRequest',
    description: 'Accept a friend request',
    args: {
        friendRequestId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { friendRequestId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canAcceptFriendRequest(friendRequestId); }),
    resolve: (_, { friendRequestId }, { prisma, pubsub, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield prisma.friendRequest.update({
            where: {
                id: friendRequestId,
            },
            data: {
                status: 'ACCEPTED',
            },
        });
        const user = yield prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                friends: {
                    connect: {
                        id: request.createdById,
                    },
                },
                friendsOf: {
                    connect: {
                        id: request.createdById,
                    },
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.FriendRequestAccepted, {
            recipients: [request.createdById],
            content: request,
        });
        pubsub.publish(backing_types_1.Subscription.FriendCreated, {
            userId: request.createdById,
            friend: user,
        });
        return request;
    }),
});
//# sourceMappingURL=friend-request.mutation.js.map