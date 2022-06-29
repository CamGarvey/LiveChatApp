"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersAdded = void 0;
const nexus_1 = require("nexus");
exports.MembersAdded = (0, nexus_1.objectType)({
    name: 'MembersAdded',
    definition(t) {
        t.implements('IMembersModified');
    },
});
//# sourceMappingURL=members-added.js.map