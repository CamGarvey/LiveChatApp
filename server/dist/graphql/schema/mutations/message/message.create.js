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
exports.createMessage = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.createMessage = (0, nexus_1.mutationField)('createMessage', {
    type: 'Message',
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
            throw new apollo_server_core_1.ForbiddenError('You are not a member of this Chat');
        }
        const message = yield prisma.message.create({
            data: {
                chatId,
                createdById: userId,
                content,
            },
        });
        pubsub.publish(backing_types_1.Subscription.MessageCreated, message);
        return message;
    }),
});
//# sourceMappingURL=message.create.js.map