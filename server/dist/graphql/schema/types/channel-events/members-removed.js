"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersRemoved = void 0;
const nexus_1 = require("nexus");
exports.MembersRemoved = (0, nexus_1.objectType)({
    name: 'MembersRemoved',
    definition(t) {
        t.implements('IMembersModified');
    },
});
//# sourceMappingURL=members-removed.js.map