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
exports.MembersQuery = void 0;
const nexus_1 = require("nexus");
const shared_1 = require("../../shared");
exports.MembersQuery = (0, nexus_1.queryField)((t) => {
    t.nonNull.connectionField('members', {
        type: 'Member',
        description: 'Get Members based on chat id',
        additionalArgs: {
            chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
                description: 'Id of the chat',
            })),
        },
        authorize: (_, { chatId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canViewChat(chatId); }),
        totalCount: () => 1,
        resolve: (_, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return dataSources.chat.getMembers(args.chatId, args); }),
    });
});
//# sourceMappingURL=member.query.js.map