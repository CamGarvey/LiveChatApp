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
exports.ChatsQuery = exports.ChatQuery = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
exports.ChatQuery = (0, nexus_1.queryField)('chat', {
    type: 'ChatResult',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of chat',
        })),
    },
    resolve: (_, { chatId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.findUnique({
            where: {
                chatId,
            },
            include: {
                members: {
                    where: {
                        userId,
                    },
                },
            },
        });
        if (!chat) {
            throw new apollo_server_core_1.UserInputError('Not found');
        }
        if (!chat.members.length) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to this chat');
        }
        return chat;
    }),
});
exports.ChatsQuery = (0, nexus_1.queryField)('chats', {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)('ChatResult'))),
    resolve: (_, __, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user
            .findUnique({
            where: {
                userId,
            },
        })
            .memberOfChats();
    }),
});
//# sourceMappingURL=chat.query.js.map