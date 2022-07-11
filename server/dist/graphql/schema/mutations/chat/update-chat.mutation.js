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
exports.updateChat = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.updateChat = (0, nexus_1.mutationField)('updateChat', {
    type: 'Chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Chat to be updated',
        })),
        name: (0, nexus_1.stringArg)({
            description: 'Name of Chat',
        }),
        description: (0, nexus_1.stringArg)({
            description: 'Description of Chat',
        }),
        isPrivate: (0, nexus_1.booleanArg)({
            description: 'If the Chat should be private',
        }),
        addMembersId: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be added to Chat',
        }))),
        removeMembersId: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be removed from Chat',
        }))),
    },
    description: 'Update a Chat',
    resolve: (_, { chatId, name, description, isPrivate, addMembersId, removeMembersId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.findUnique({
            select: {
                createdById: true,
                members: {
                    select: {
                        id: true,
                    },
                },
            },
            where: {
                id: chatId,
            },
        });
        if (chat == null) {
            throw new apollo_server_core_1.UserInputError(`Chat with id: ${chatId}, not found`);
        }
        if (chat.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to update this chat');
        }
        const updatedChat = yield prisma.chat.update({
            data: {
                name,
                description,
                isPrivate,
                members: {
                    connect: addMembersId === null || addMembersId === void 0 ? void 0 : addMembersId.map((x) => ({ id: x })),
                    disconnect: removeMembersId === null || removeMembersId === void 0 ? void 0 : removeMembersId.map((x) => ({ id: x })),
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
                name,
                description,
                memberIdsAdded: addMembersId,
                memberIdsRemoved: removeMembersId,
            },
            include: {
                chat: {
                    select: {
                        members: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.ChatUpdated, update);
        return updatedChat;
    }),
});
//# sourceMappingURL=update-chat.mutation.js.map