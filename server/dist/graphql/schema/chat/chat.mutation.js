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
exports.DeleteChatMutation = exports.UpdateGroupChatDescription = exports.UpdateGroupChatName = exports.CreateDirectMessageChatMutation = exports.CreateGroupChatMutation = void 0;
const graphql_1 = require("graphql");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
const shared_1 = require("../shared");
const chat_input_1 = require("./chat.input");
exports.CreateGroupChatMutation = (0, nexus_1.mutationField)('createGroupChat', {
    type: 'GroupChat',
    description: 'Create a group chat',
    args: { data: (0, nexus_1.nonNull)(chat_input_1.CreateGroupChatInput) },
    authorize: (_, { data: { memberIds } }, { auth }) => auth.canCreateGroupChat(memberIds !== null && memberIds !== void 0 ? memberIds : []),
    resolve: (_, { data: { name, description, memberIds } }, { prisma, currentUserId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const memberIdSet = new Set(memberIds);
        memberIdSet.add(currentUserId);
        const chat = yield prisma.chat.create({
            data: {
                type: 'GROUP',
                name,
                description,
                createdById: currentUserId,
                members: {
                    createMany: {
                        data: [...memberIdSet].map((id) => ({
                            userId: id,
                            role: id == currentUserId ? 'OWNER' : 'BASIC',
                            addedById: currentUserId,
                        })),
                    },
                },
            },
        });
        const alert = yield prisma.alert.create({
            data: {
                type: 'CHAT_ACCESS_GRANTED',
                chat: {
                    connect: {
                        id: chat.id,
                    },
                },
                recipients: {
                    connect: [...memberIdSet]
                        .filter((id) => id !== currentUserId)
                        .map((id) => ({ id })),
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatMemberAccessGrantedAlert, {
            recipients: [...memberIdSet].filter((id) => id !== currentUserId),
            content: alert,
        });
        return chat;
    }),
});
exports.CreateDirectMessageChatMutation = (0, nexus_1.mutationField)('createDirectMessageChat', {
    type: 'DirectMessageChat',
    description: 'Create a direct message chat',
    args: {
        friendId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of friend to create a Direct Message Chat with',
        })),
    },
    authorize: (_, { friendId }, { auth }) => auth.canCreateDirectMessageChat(friendId),
    resolve: (_, { friendId }, { prisma, currentUserId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const existingChat = yield prisma.chat.findFirst({
            where: {
                type: 'DIRECT_MESSAGE',
                members: {
                    every: {
                        userId: {
                            in: [friendId, currentUserId],
                        },
                    },
                },
            },
        });
        if (existingChat !== null) {
            return existingChat;
        }
        const chat = yield prisma.chat.create({
            data: {
                type: 'DIRECT_MESSAGE',
                name: `${currentUserId}.${friendId}`,
                createdById: currentUserId,
                members: {
                    createMany: {
                        data: [currentUserId, friendId].map((id) => ({
                            userId: id,
                            role: 'ADMIN',
                            addedById: currentUserId,
                        })),
                    },
                },
            },
        });
        const alert = yield prisma.alert.create({
            data: {
                type: 'CHAT_ACCESS_GRANTED',
                chat: {
                    connect: {
                        id: chat.id,
                    },
                },
                recipients: {
                    connect: {
                        id: friendId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatMemberAccessGrantedAlert, {
            recipients: [currentUserId],
            content: alert,
        });
        return chat;
    }),
});
exports.UpdateGroupChatName = (0, nexus_1.mutationField)('updateGroupChatName', {
    type: 'NameUpdatedEvent',
    description: 'Update the name of group chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of chat to update',
        })),
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'New name',
        })),
    },
    authorize: (_, { chatId }, { auth }) => auth.canUpdateGroupChatBasic({ chatId }),
    resolve: (_, { chatId, name }, { currentUserId, prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chatBeforeUpdate = yield prisma.chat.findUniqueOrThrow({
            where: {
                id: chatId,
            },
            select: {
                name: true,
            },
        });
        if (name === chatBeforeUpdate.name) {
            throw new graphql_1.GraphQLError('Name has not changed');
        }
        const chatAfterUpdate = yield prisma.chat.update({
            data: {
                name,
            },
            include: {
                members: {
                    select: {
                        userId: true,
                    },
                },
            },
            where: {
                id: chatId,
            },
        });
        const event = yield prisma.event.create({
            data: {
                type: 'CHAT_UPDATE',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                chatUpdate: {
                    create: {
                        type: 'NAME_UPDATED',
                        nameBefore: chatBeforeUpdate.name,
                        nameAfter: chatAfterUpdate.name,
                    },
                },
            },
        });
        const recipients = chatAfterUpdate.members
            .map((x) => x.userId)
            .filter((x) => x !== currentUserId);
        yield pubsub.publish(backing_types_1.Subscription.EventCreated, {
            recipients,
            content: event,
        });
        return event;
    }),
});
exports.UpdateGroupChatDescription = (0, nexus_1.mutationField)('updateGroupChatDescription', {
    type: 'DescriptionUpdatedEvent',
    description: 'Update the description of a group chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of chat to update',
        })),
        description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'New description',
        })),
    },
    authorize: (_, { chatId }, { auth }) => auth.canUpdateGroupChatBasic({ chatId }),
    resolve: (_, { chatId, description }, { currentUserId, prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chatBeforeUpdate = yield prisma.chat.findUniqueOrThrow({
            where: {
                id: chatId,
            },
            select: {
                description: true,
            },
        });
        if (description === chatBeforeUpdate.description) {
            throw new graphql_1.GraphQLError('Description has not changed');
        }
        const chatAfterUpdate = yield prisma.chat.update({
            data: {
                description,
            },
            select: {
                description: true,
                members: {
                    select: {
                        userId: true,
                    },
                },
            },
            where: {
                id: chatId,
            },
        });
        const event = yield prisma.event.create({
            data: {
                type: 'CHAT_UPDATE',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                chatUpdate: {
                    create: {
                        type: 'DESCRIPTION_UPDATED',
                        descriptionBefore: chatBeforeUpdate.description,
                        descriptionAfter: chatAfterUpdate.description,
                    },
                },
            },
        });
        const recipients = chatAfterUpdate.members
            .map((x) => x.userId)
            .filter((x) => x !== currentUserId);
        yield pubsub.publish(backing_types_1.Subscription.EventCreated, {
            recipients,
            content: event,
        });
        return event;
    }),
});
exports.DeleteChatMutation = (0, nexus_1.mutationField)('deleteChat', {
    type: 'DeletedChat',
    description: 'Delete a chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of chat to be deleted',
        })),
    },
    authorize: (_, { chatId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canDeleteChat(chatId); }),
    resolve: (_, { chatId }, { prisma, pubsub, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.update({
            where: {
                id: chatId,
            },
            data: {
                deletedAt: new Date().toISOString(),
            },
            include: {
                members: {
                    select: {
                        userId: true,
                    },
                },
            },
        });
        const alert = yield prisma.alert.create({
            data: {
                type: 'CHAT_DELETED',
                chat: {
                    connect: {
                        id: chat.id,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatDeletedAlert, {
            recipients: chat.members
                .map((x) => x.userId)
                .filter((x) => x !== currentUserId),
            content: alert,
        });
        return chat;
    }),
});
//# sourceMappingURL=chat.mutation.js.map