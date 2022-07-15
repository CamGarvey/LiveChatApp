"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatResultUnion = void 0;
const nexus_1 = require("nexus");
exports.ChatResultUnion = (0, nexus_1.unionType)({
    name: 'ChatResult',
    resolveType: (chat) => {
        if (chat.deletedAt !== null)
            return 'DeletedChat';
        return chat.isDM ? 'DirectMessageChat' : 'GroupChat';
    },
    definition: (t) => {
        t.members('DirectMessageChat', 'GroupChat', 'DeletedChat');
    },
});
//# sourceMappingURL=chat.union.js.map