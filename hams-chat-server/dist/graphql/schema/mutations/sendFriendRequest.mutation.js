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
const nexus_1 = require("nexus");
const subscriptions_1 = require("../types/subscriptions");
exports.sendFriendRequest = (0, nexus_1.mutationField)('sendFriendRequest', {
    type: 'Boolean',
    args: {
        userId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Send a Friend Request to a User',
    resolve: (_, { userId, friendId }, { prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
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
            throw new Error('User does not exists, already friends, request already sent or request already received');
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
//# sourceMappingURL=sendFriendRequest.mutation.js.map