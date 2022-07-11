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
exports.cancelFriendRequest = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.cancelFriendRequest = (0, nexus_1.mutationField)('cancelFriendRequest', {
    type: 'Stranger',
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
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestDeleted, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestDeleted, friend);
        return friend;
    }),
});
//# sourceMappingURL=cancel-friend-result.mutation.js.map