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
exports.removeMembersFromChat = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.removeMembersFromChat = (0, nexus_1.mutationField)('removeMembersFromChat', {
    type: 'Chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        membersIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
    },
    description: 'Remove Members from Chat',
    resolve: (_, { chatId, membersIds }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield prisma.chat
            .findUnique({
            where: {
                id: chatId,
            },
        })
            .members();
        if (!members.find((member) => member.id == userId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to remove members from this chat');
        }
        const chat = yield prisma.chat.update({
            data: {
                members: {
                    disconnect: membersIds.map((id) => ({ id })),
                },
            },
            where: {
                id: chatId,
            },
        });
        const update = yield prisma.chatUpdate.create({
            data: {
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: userId,
                    },
                },
                memberIdsRemoved: membersIds,
            },
        });
        pubsub.publish(backing_types_1.Subscription.ChatMembersDeleted, update);
        return chat;
    }),
});
//# sourceMappingURL=remove-members.mutation.js.map