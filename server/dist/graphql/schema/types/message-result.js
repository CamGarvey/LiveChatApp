"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResult = void 0;
const nexus_1 = require("nexus");
exports.MessageResult = (0, nexus_1.unionType)({
    name: 'MessageResult',
    resolveType: (source) => source.deletedAt == null ? 'Message' : 'DeletedMessage',
    definition: (t) => {
        t.members('Message', 'DeletedMessage');
    },
});
//# sourceMappingURL=message-result.js.map