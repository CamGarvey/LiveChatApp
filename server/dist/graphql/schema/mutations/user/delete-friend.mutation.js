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
exports.deleteFriend = void 0;
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.deleteFriend = (0, nexus_1.mutationField)('deleteFriend', {
    type: 'Stranger',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Delete a Friend',
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
        pubsub.publish(backing_types_1.Subscription.UserFriendDeleted, user);
        pubsub.publish(backing_types_1.Subscription.UserFriendDeleted, { id: friendId });
        return newUser;
    }),
});
//# sourceMappingURL=delete-friend.mutation.js.map