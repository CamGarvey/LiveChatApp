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
exports.addMembersToChat = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.addMembersToChat = (0, nexus_1.mutationField)('addMembersToChat', {
    type: 'Chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Chat to add Users to',
        })),
        memberIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be added to Chat',
        })))),
    },
    description: 'Add Members into Chat',
    resolve: (_, { chatId, memberIds }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                memberOfChats: {
                    where: {
                        id: chatId,
                    },
                },
                friends: {
                    where: {
                        id: {
                            in: memberIds,
                        },
                    },
                },
            },
        });
        if (user.memberOfChats.length == 0) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to add members to this chat');
        }
        if (user.friends.length != memberIds.length) {
            throw new apollo_server_core_1.ForbiddenError('You are not friends with all of these users');
        }
        const chat = yield prisma.chat.update({
            data: {
                members: {
                    connect: memberIds.map((id) => ({ id })),
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
                memberIdsAdded: memberIds,
            },
        });
        pubsub.publish(backing_types_1.Subscription.ChatMembersAdded, update);
        return chat;
    }),
});
//# sourceMappingURL=add-members.mutation.js.map