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
exports.AcceptRequestMutation = exports.DeclineRequestMutation = exports.CancelRequestMutation = exports.SendFriendRequestMutation = void 0;
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
const shared_1 = require("../../shared");
exports.SendFriendRequestMutation = (0, nexus_1.mutationField)('sendFriendRequest', {
    type: 'FriendRequest',
    description: 'Send a friend request to a user',
    args: {
        userId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { userId }, { auth }) => auth.canSendFriendRequest(userId),
    resolve: (_, { userId }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return dataSources.user.sendFriendRequest(userId); }),
});
exports.CancelRequestMutation = (0, nexus_1.mutationField)('cancelRequest', {
    type: 'Request',
    description: 'Cancel a sent request',
    args: {
        requestId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { requestId }, { auth }) => auth.canCancelRequest(requestId),
    resolve: (_, { requestId }, { prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield prisma.request.update({
            data: {
                state: 'CANCELLED',
            },
            where: {
                id: requestId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.RequestCancelled, {
            recipients: [request.recipientId],
            content: request,
        });
        return request;
    }),
});
exports.DeclineRequestMutation = (0, nexus_1.mutationField)('declineRequest', {
    type: 'Request',
    description: 'Decline a received request',
    args: {
        requestId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { requestId }, { auth }) => auth.canDeclineRequest(requestId),
    resolve: (_, { requestId }, { prisma, pubsub, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield prisma.request.update({
            data: {
                state: 'DECLINED',
            },
            where: {
                id: requestId,
            },
        });
        const alert = yield prisma.alert.upsert({
            create: {
                type: 'REQUEST_DECLINED',
                createdById: currentUserId,
                recipients: {
                    connect: {
                        id: request.createdById,
                    },
                },
                requestId,
            },
            update: {},
            where: {
                requestId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.RequestCancelled, {
            recipients: [request.createdById],
            content: alert,
        });
        return request;
    }),
});
exports.AcceptRequestMutation = (0, nexus_1.mutationField)('acceptRequest', {
    type: 'Request',
    description: 'Accept a request',
    args: {
        requestId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { requestId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canAcceptRequest(requestId); }),
    resolve: (_, { requestId }, { prisma, pubsub, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        const request = yield prisma.request.update({
            data: {
                state: 'ACCEPTED',
            },
            where: {
                id: requestId,
            },
        });
        const alert = yield prisma.alert.upsert({
            create: {
                type: 'REQUEST_ACCEPTED',
                createdById: currentUserId,
                recipients: {
                    connect: {
                        id: request.createdById,
                    },
                },
                requestId,
            },
            update: {},
            where: {
                requestId,
            },
        });
        if (request.type === 'FRIEND_REQUEST') {
            yield prisma.user.update({
                where: {
                    id: currentUserId,
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
        }
        pubsub.publish(backing_types_1.Subscription.RequestAcceptedAlert, {
            recipients: [request.createdById],
            content: alert,
        });
        return request;
    }),
});
//# sourceMappingURL=request.mutation.js.map