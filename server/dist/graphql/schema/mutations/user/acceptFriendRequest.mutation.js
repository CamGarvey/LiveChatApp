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
exports.acceptFriendRequest = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const subscriptions_1 = require("../types/subscriptions");
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
        if (!receivedRequests.find((request) => request.id)) {
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
//# sourceMappingURL=acceptFriendRequest.mutation.js.map