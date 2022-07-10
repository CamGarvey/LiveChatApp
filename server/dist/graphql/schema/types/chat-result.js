"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatResult = void 0;
const nexus_1 = require("nexus");
exports.ChatResult = (0, nexus_1.unionType)({
    name: 'ChatResult',
    resolveType: (source) => (source.deletedAt == null ? 'Chat' : 'DeletedChat'),
    definition: (t) => {
        t.members('Chat', 'DeletedChat');
    },
});
//# sourceMappingURL=chat-result.js.map