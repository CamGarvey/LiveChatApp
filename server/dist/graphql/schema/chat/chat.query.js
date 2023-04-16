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
const nexus_1 = require("nexus");
const shared_1 = require("../shared");
exports.ChatQuery = (0, nexus_1.queryField)('chat', {
    type: 'Chat',
    description: 'Get a chat by id',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of chat',
        })),
    },
    authorize: (_, { chatId }, { auth }) => auth.canViewChat(chatId),
    resolve: (_, { chatId }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.chat.getChat(chatId); }),
});
exports.ChatsQuery = (0, nexus_1.queryField)('chats', {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)('Chat'))),
    description: 'Get all chats you are a member in',
    resolve: (_, __, { prisma, currentUserId, dataSources }) => __awaiter(void 0, void 0, void 0, function* () {
        dataSources.user.getUser(currentUserId).memberOfChats();
    }),
});
//# sourceMappingURL=chat.query.js.map