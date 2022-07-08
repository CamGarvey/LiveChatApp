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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMessage = exports.deleteMessage = exports.createMessage = void 0;
const nexus_1 = require("nexus");
const apollo_server_errors_1 = require("apollo-server-errors");
const message_1 = __importDefault(require("../types/message"));
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.createMessage = (0, nexus_1.mutationField)('createMessage', {
    type: message_1.default,
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Chat to create Message in',
        })),
        content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Content of Message',
        })),
    },
    description: 'Create a Message in a Chat',
    resolve: (_, { chatId, content }, { prisma, pubsub, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                memberOfChats: {
                    where: {
                        id: chatId,
                    },
                },
            },
        });
        if (!user.memberOfChats) {
            throw new apollo_server_errors_1.ForbiddenError('You are not a member of this Chat');
        }
        const message = yield prisma.message.create({
            data: {
                chatId,
                createdById: userId,
                content,
            },
        });
        pubsub.publish(subscriptions_enum_1.Subscription.MessageCreated, message);
        return message;
    }),
});
exports.deleteMessage = (0, nexus_1.mutationField)('deleteMessage', {
    type: message_1.default,
    args: {
        messageId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Message to delete',
        })),
    },
    description: 'Delete a Message',
    resolve: (_, { messageId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: messageId,
            },
        });
        if (message == null) {
            throw new apollo_server_errors_1.UserInputError(`Message with id: ${messageId}, not found`);
        }
        if (message.createdById != userId) {
            throw new apollo_server_errors_1.ForbiddenError('You do not have permission to delete this Message');
        }
        return prisma.message.update({
            data: {
                deletedAt: Date.now().toString(),
            },
            where: {
                id: messageId,
            },
        });
    }),
});
exports.editMessage = (0, nexus_1.mutationField)('editMessage', {
    type: message_1.default,
    args: {
        messageId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Message to edit',
        })),
        content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'New content for Message',
        })),
    },
    description: 'Edit a Message',
    resolve: (_, { messageId, content }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: messageId,
            },
        });
        if (message == null) {
            throw new apollo_server_errors_1.UserInputError(`Message with id: ${messageId}, not found`);
        }
        if (message.createdById != userId) {
            throw new apollo_server_errors_1.ForbiddenError('You do not have permission to edit this Message');
        }
        return yield prisma.message.update({
            data: {
                content,
            },
            where: {
                id: messageId,
            },
        });
    }),
});
//# sourceMappingURL=message.mutation.js.map