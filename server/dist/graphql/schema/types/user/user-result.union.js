"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResult = void 0;
const nexus_1 = require("nexus");
exports.UserResult = (0, nexus_1.unionType)({
    name: 'UserResult',
    resolveType: (t) => 'Friend',
    definition: (t) => {
        t.members('Stranger', 'User');
    },
});
//# sourceMappingURL=user-result.union.js.map