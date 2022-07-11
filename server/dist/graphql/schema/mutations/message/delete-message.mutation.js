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
exports.deleteMessage = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("src/graphql/backing-types");
exports.deleteMessage = (0, nexus_1.mutationField)('deleteMessage', {
    type: 'Message',
    args: {
        messageId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Message to delete',
        })),
    },
    description: 'Delete a Message',
    resolve: (_, { messageId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: messageId,
            },
        });
        if (message == null) {
            throw new apollo_server_core_1.UserInputError(`Message with id: ${messageId}, not found`);
        }
        console.log({ message, userId });
        if (message.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to delete this Message');
        }
        const updatedMessage = prisma.message.update({
            data: {
                deletedAt: new Date(),
            },
            where: {
                id: messageId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.MessageDeleted, updatedMessage);
        return updatedMessage;
    }),
});
//# sourceMappingURL=delete-message.mutation.js.map