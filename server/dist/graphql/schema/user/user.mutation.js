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
exports.DeleteFriendMutation = exports.UpdateUserMutation = void 0;
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
const shared_1 = require("../shared");
exports.UpdateUserMutation = (0, nexus_1.mutationField)('updateUser', {
    type: 'Me',
    description: 'Update current user',
    args: {
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve(_, { name }, { currentUserId, prisma }) {
        return prisma.user.update({
            data: {
                name,
            },
            where: {
                id: currentUserId,
            },
        });
    },
});
exports.DeleteFriendMutation = (0, nexus_1.mutationField)('deleteFriend', {
    type: 'Stranger',
    description: 'Delete a Friend',
    args: {
        friendId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    authorize: (_, { friendId }, { auth }) => auth.canDeleteFriend(friendId),
    resolve: (_, { friendId }, { prisma, currentUserId, pubsub, dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedUser = yield dataSources.user.deleteFriend(friendId);
        const alert = yield prisma.alert.create({
            data: {
                type: 'FRIEND_DELETED',
                recipients: {
                    connect: {
                        id: deletedUser.id,
                    },
                },
                createdById: currentUserId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.FriendDeletedAlert, {
            recipients: [friendId],
            content: alert,
        });
        return deletedUser;
    }),
});
//# sourceMappingURL=user.mutation.js.map