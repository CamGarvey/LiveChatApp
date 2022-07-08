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
exports.removeMembersFromChat = exports.addMembersToChat = exports.updateChat = exports.deleteChat = exports.createChat = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.createChat = (0, nexus_1.mutationField)('createChat', {
    type: 'Chat',
    args: {
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Name of the Chat',
        })),
        description: (0, nexus_1.stringArg)({
            description: 'Description of Chat',
        }),
        isPrivate: (0, nexus_1.booleanArg)({
            description: 'If the Chat should be private',
            default: true,
        }),
        memberIds: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be added to Chat',
        }))),
    },
    description: 'Create a Chat',
    resolve: (_, { name, description, isPrivate, memberIds }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const memberIdSet = new Set(memberIds);
        if (memberIdSet.has(userId)) {
            memberIdSet.delete(userId);
        }
        if (memberIdSet) {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    friends: {
                        where: {
                            id: {
                                in: memberIds,
                            },
                        },
                    },
                },
            });
            if (!user) {
                throw new Error('Failed to find user');
            }
            if (user.friends.length != memberIdSet.size) {
                throw new apollo_server_core_1.ForbiddenError('You are not friends with all of the users provided');
            }
        }
        memberIdSet.add(userId);
        return yield prisma.chat.create({
            data: {
                name,
                description,
                createdById: userId,
                isDM: false,
                isPrivate,
                members: {
                    connect: [...memberIdSet].map((id) => ({ id })),
                },
            },
        });
    }),
});
exports.deleteChat = (0, nexus_1.mutationField)('deleteChat', {
    type: 'Boolean',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Chat to be deleted',
        })),
    },
    description: 'Delete a Chat',
    resolve: (_, { chatId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: chatId,
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
                id: chatId,
            },
        });
        return true;
    }),
});
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
        });
        console.log(update);
        pubsub.publish(subscriptions_enum_1.Subscription.ChatUpdated, update);
        return updatedChat;
    }),
});
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
        pubsub.publish(subscriptions_enum_1.Subscription.ChatUpdated, update);
        return chat;
    }),
});
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
        pubsub.publish(subscriptions_enum_1.Subscription.ChatUpdated, update);
        return chat;
    }),
});
//# sourceMappingURL=chat.mutation.js.map