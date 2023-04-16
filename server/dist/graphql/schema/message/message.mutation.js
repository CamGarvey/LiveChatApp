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
exports.UpdateMessageMutation = exports.DeleteMessageMutation = exports.CreateMessageMutation = void 0;
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
const shared_1 = require("../shared");
exports.CreateMessageMutation = (0, nexus_1.mutationField)('createMessage', {
    type: 'InstantMessage',
    description: 'Create a Message in a Chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of Chat to create Message in',
        })),
        content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Content of Message',
        })),
    },
    authorize: (_, { chatId }, { auth }) => auth.canCreateMessage(chatId),
    resolve: (_, { chatId, content }, { prisma, pubsub, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.create({
            data: {
                chatId,
                createdById: userId,
                content,
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
        pubsub.publish(backing_types_1.Subscription.MessageCreated, {
            recipients: message.chat.members
                .map((x) => x.id)
                .filter((x) => x !== userId),
            content: message,
        });
        return message;
    }),
});
exports.DeleteMessageMutation = (0, nexus_1.mutationField)('deleteMessage', {
    type: 'DeletedMessage',
    args: {
        messageId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of Message to delete',
        })),
    },
    description: 'Delete a Message',
    authorize: (_, { messageId }, { auth }) => auth.canDeletedMessage(messageId),
    resolve: (_, { messageId }, { prisma, pubsub, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.update({
            data: {
                deletedAt: new Date(),
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
            where: {
                id: messageId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.MessageDeleted, {
            recipients: message.chat.members
                .map((x) => x.id)
                .filter((x) => x !== userId),
            content: message,
        });
        return message;
    }),
});
exports.UpdateMessageMutation = (0, nexus_1.mutationField)('updateMessage', {
    type: 'InstantMessage',
    args: {
        messageId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of Message to edit',
        })),
        content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'New content for Message',
        })),
    },
    description: 'Update a Message',
    authorize: (_, { messageId }, { auth }) => auth.canUpdateMessage(messageId),
    resolve: (_, { messageId, content }, { prisma, pubsub, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.update({
            data: {
                content,
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
            where: {
                id: messageId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.MessageUpdated, {
            recipients: message.chat.members
                .map((x) => x.id)
                .filter((x) => x !== userId),
            content: message,
        });
        return message;
    }),
});
//# sourceMappingURL=message.mutation.js.map