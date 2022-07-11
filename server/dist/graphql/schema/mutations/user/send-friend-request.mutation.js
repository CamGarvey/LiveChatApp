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
exports.sendFriendRequest = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.sendFriendRequest = (0, nexus_1.mutationField)('sendFriendRequest', {
    type: 'Stranger',
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
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestSent, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendRequestReceived, friend);
        return friend;
    }),
});
//# sourceMappingURL=send-friend-request.mutation.js.map