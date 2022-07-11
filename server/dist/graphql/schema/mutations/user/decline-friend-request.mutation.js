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
exports.declineFriendRequest = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.declineFriendRequest = (0, nexus_1.mutationField)('declineFriendRequest', {
    type: 'Stranger',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Delete/Decline a received Friend Request',
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
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
            },
        });
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestDeleted, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestDeleted, friend);
        return friend;
    }),
});
//# sourceMappingURL=decline-friend-request.mutation.js.map