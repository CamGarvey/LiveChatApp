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
exports.updateMessage = void 0;
const nexus_1 = require("nexus");
const apollo_server_errors_1 = require("apollo-server-errors");
const backing_types_1 = require("../../../backing-types");
exports.updateMessage = (0, nexus_1.mutationField)('updateMessage', {
    type: 'Message',
    args: {
        messageId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Message to edit',
        })),
        content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'New content for Message',
        })),
    },
    description: 'Update a Message',
    resolve: (_, { messageId, content }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedMessage = yield prisma.message.update({
            data: {
                content,
            },
            where: {
                id: messageId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.MessageUpdated, updatedMessage);
        return updatedMessage;
    }),
});
//# sourceMappingURL=message.update.js.map