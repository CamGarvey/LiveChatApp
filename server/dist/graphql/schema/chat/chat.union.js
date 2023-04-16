"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSubscriptionResult = void 0;
const nexus_1 = require("nexus");
exports.ChatSubscriptionResult = (0, nexus_1.unionType)({
    name: 'ChatSubscriptionResult',
    resolveType: (source) => source.type,
    definition: (t) => {
        t.members('GroupChat', 'DirectMessageChat', 'DeletedChat');
    },
});
//# sourceMappingURL=chat.union.js.map