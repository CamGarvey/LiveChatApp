"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMembersModified = void 0;
const nexus_1 = require("nexus");
exports.IMembersModified = (0, nexus_1.interfaceType)({
    name: 'IMembersModified',
    definition(t) {
        t.nonNull.id('byUserId');
        t.nonNull.list.nonNull.id('memberIds');
    },
});
//# sourceMappingURL=members-modified.interface.js.map