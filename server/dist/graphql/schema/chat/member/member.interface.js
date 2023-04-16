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
exports.MemberInterface = void 0;
const nexus_1 = require("nexus");
exports.MemberInterface = (0, nexus_1.interfaceType)({
    name: 'Member',
    description: 'Member of chat',
    resolveType: (source) => {
        return source.deletedAt === null ? 'ChatMember' : 'DeletedMember';
    },
    definition: (t) => {
        t.nonNull.field('role', {
            type: 'Role',
            description: 'Role of member in chat',
        });
        t.nonNull.hashId('userId', {
            description: 'Id of user assiociated with member',
        });
        t.nonNull.field('user', {
            type: 'User',
            description: 'User associated with member',
            resolve: ({ userId }, _, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.user.getUser(userId); }),
        });
        t.nonNull.hashId('chatId', {
            description: 'Id of chat assiociated with member',
        });
        t.nonNull.field('chat', {
            type: 'Chat',
            description: 'Chat associated with member',
            resolve: ({ chatId }, _, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.chat.getChat(chatId); }),
        });
        t.nonNull.hashId('addedById', {
            description: 'Id of user that added this member into the chat',
        });
        t.nonNull.field('addedBy', {
            type: 'User',
            description: 'User that added this member into the chat',
            resolve: ({ addedById }, _, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.user.getUser(addedById); }),
        });
    },
});
//# sourceMappingURL=member.interface.js.map