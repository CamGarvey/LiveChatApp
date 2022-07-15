"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatInterface = void 0;
const nexus_1 = require("nexus");
exports.ChatInterface = (0, nexus_1.interfaceType)({
    name: 'ChatInterface',
    resolveType: (chat) => {
        if (chat.deletedAt !== null)
            return 'DeletedChat';
        return chat.isDM ? 'DirectMessageChat' : 'GroupChat';
    },
    definition: (t) => {
        t.nonNull.id('chatId');
        t.nonNull.id('createdById');
        t.field('createdBy', {
            type: 'UserResult',
        });
        t.nonNull.boolean('isCreator', {
            resolve: (parent, _, { userId }) => {
                return parent.createdById == userId;
            },
        });
        t.date('updatedAt');
    },
});
//# sourceMappingURL=chat.interface.js.map