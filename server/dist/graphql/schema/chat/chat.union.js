"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatResultUnion = void 0;
const nexus_1 = require("nexus");
exports.ChatResultUnion = (0, nexus_1.unionType)({
    name: 'ChatResult',
    resolveType: (source) => (source.deletedAt == null ? 'Chat' : 'DeletedChat'),
    definition: (t) => {
        t.members('Chat', 'DeletedChat');
    },
});
//# sourceMappingURL=chat.union.js.map