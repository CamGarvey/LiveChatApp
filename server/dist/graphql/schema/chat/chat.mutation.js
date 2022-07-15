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
exports.DeleteChatMutation = exports.UpdateChatMutation = exports.RemoveMembersFromGroupChatMutation = exports.AddMembersToGroupChatMutation = exports.CreateDirectMessageChatMutation = exports.CreateGroupChatMutation = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
const chat_input_1 = require("./chat.input");
exports.CreateGroupChatMutation = (0, nexus_1.mutationField)('createGroupChat', {
    type: 'GroupChat',
    args: { data: chat_input_1.CreateGroupChatInput },
    description: 'Create a Chat',
    authorize: (_, { data: { memberIds } }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return auth.canCreateGroupChat(memberIds); }),
    resolve: (_, { data: { name, description, memberIds } }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const memberIdSet = new Set(memberIds);
        memberIdSet.add(userId);
        const chat = yield prisma.chat.create({
            data: {
                name,
                description,
                createdById: userId,
                isDM: false,
                members: {
                    connect: [...memberIdSet].map((id) => ({ userId: id })),
                },
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatCreated, chat);
        yield pubsub.publish(backing_types_1.Subscription.UserChatCreated, chat);
        return chat;
    }),
});
exports.CreateDirectMessageChatMutation = (0, nexus_1.mutationField)('createDirectMessageChat', {
    type: 'DirectMessageChat',
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of friend to create a Direct Message Chat with',
        })),
    },
    description: 'Create a Chat',
    authorize: (_, { friendId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canCreateDirectMessageChat(friendId); }),
    resolve: (_, { friendId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.create({
            data: {
                name: `${userId}.${friendId}`,
                createdById: userId,
                isDM: true,
                members: {
                    connect: [userId, friendId].map((id) => ({ userId: id })),
                },
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatCreated, chat);
        yield pubsub.publish(backing_types_1.Subscription.UserChatCreated, chat);
        return chat;
    }),
});
exports.AddMembersToGroupChatMutation = (0, nexus_1.mutationField)('addMembersToGroupChat', {
    type: 'ChatResult',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Chat to add Users to',
        })),
        memberIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be added to Chat',
        })))),
    },
    description: 'Add Members into Chat',
    authorize: (_, { chatId, memberIds }, { auth }) => auth.canAddMembersToChat(chatId, memberIds),
    resolve: (_, { chatId, memberIds }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.update({
            data: {
                members: {
                    connect: memberIds.map((id) => ({ userId: id })),
                },
            },
            where: {
                chatId,
            },
        });
        const update = yield prisma.chatUpdate.create({
            data: {
                chat: {
                    connect: {
                        chatId,
                    },
                },
                createdBy: {
                    connect: {
                        userId,
                    },
                },
                memberIdsAdded: memberIds,
            },
        });
        pubsub.publish(backing_types_1.Subscription.ChatMembersAdded, update);
        return chat;
    }),
});
exports.RemoveMembersFromGroupChatMutation = (0, nexus_1.mutationField)('removeMembersFromChat', {
    type: 'ChatResult',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        membersIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
    },
    description: 'Remove Members from Chat',
    authorize: (_, { chatId }, { auth }) => auth.canRemoveMembersFromChat(chatId),
    resolve: (_, { chatId, membersIds }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.update({
            data: {
                members: {
                    disconnect: membersIds.map((id) => ({ userId: id })),
                },
            },
            where: {
                chatId,
            },
        });
        const update = yield prisma.chatUpdate.create({
            data: {
                chat: {
                    connect: {
                        chatId,
                    },
                },
                createdBy: {
                    connect: {
                        userId,
                    },
                },
                memberIdsRemoved: membersIds,
            },
        });
        pubsub.publish(backing_types_1.Subscription.ChatMembersDeleted, update);
        return chat;
    }),
});
exports.UpdateChatMutation = (0, nexus_1.mutationField)('updateChat', {
    type: 'ChatResult',
    args: { data: chat_input_1.UpdateChatInput },
    description: 'Update a Chat',
    resolve: (_, { data: { chatId, name, description, addMemberIds, removeMemberIds } }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.findUnique({
            select: {
                createdById: true,
                members: {
                    select: {
                        userId: true,
                    },
                },
            },
            where: {
                chatId,
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
                members: {
                    connect: addMemberIds === null || addMemberIds === void 0 ? void 0 : addMemberIds.map((x) => ({ userId: x })),
                    disconnect: removeMemberIds === null || removeMemberIds === void 0 ? void 0 : removeMemberIds.map((x) => ({ userId: x })),
                },
            },
            where: {
                chatId,
            },
        });
        const update = yield prisma.chatUpdate.create({
            data: {
                chat: {
                    connect: {
                        chatId,
                    },
                },
                createdBy: {
                    connect: {
                        userId,
                    },
                },
                name,
                description,
                memberIdsAdded: addMemberIds,
                memberIdsRemoved: removeMemberIds,
            },
            include: {
                chat: {
                    select: {
                        members: {
                            select: {
                                userId: true,
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
exports.DeleteChatMutation = (0, nexus_1.mutationField)('deleteChat', {
    type: 'DeletedChat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Chat to be deleted',
        })),
    },
    description: 'Delete a Chat',
    resolve: (_, { chatId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.findUnique({
            where: {
                chatId,
            },
        });
        if (chat == null) {
            throw new apollo_server_core_1.ApolloError('Chat does not exist');
        }
        if (chat.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to delete this chat');
        }
        yield prisma.chat.delete({
            where: {
                chatId,
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatDeleted, chat);
        return chat;
    }),
});
//# sourceMappingURL=chat.mutation.js.map