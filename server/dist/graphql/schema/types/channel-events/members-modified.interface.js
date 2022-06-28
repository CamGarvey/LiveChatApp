"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const MembersModified = (0, nexus_1.interfaceType)({
    name: 'MembersModified',
    definition(t) {
        t.nonNull.id('byUserId');
        t.nonNull.list.nonNull.id('memberIds');
    },
});
exports.default = MembersModified;
//# sourceMappingURL=members-modified.interface.js.map