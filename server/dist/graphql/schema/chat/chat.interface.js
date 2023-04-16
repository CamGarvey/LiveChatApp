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
exports.ChatInterface = void 0;
const nexus_1 = require("nexus");
exports.ChatInterface = (0, nexus_1.interfaceType)({
    name: 'Chat',
    description: 'Chat interface',
    resolveType: (chat) => chat.deletedAt
        ? 'DeletedChat'
        : chat.type === 'DIRECT_MESSAGE'
            ? 'DirectMessageChat'
            : 'GroupChat',
    definition: (t) => {
        t.nonNull.hashId('id', {
            description: 'Id of chat',
        });
        t.nonNull.hashId('createdById', {
            description: 'Id of user that created the chat',
        });
        t.nonNull.field('createdBy', {
            type: 'User',
            description: 'User that created the chat',
            resolve: (parent, _, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.user.getUser(parent.createdById); }),
        });
        t.nonNull.boolean('isCreator', {
            description: 'Are you the creator?',
            resolve: (parent, _, { currentUserId }) => {
                return parent.createdById == currentUserId;
            },
        });
        t.date('createdAt', {
            description: 'Time of creation',
        });
        t.date('updatedAt', {
            description: 'Time of last update',
        });
    },
});
//# sourceMappingURL=chat.interface.js.map