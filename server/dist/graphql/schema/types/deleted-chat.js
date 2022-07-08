"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedChat = void 0;
const nexus_1 = require("nexus");
exports.DeletedChat = (0, nexus_1.objectType)({
    name: 'DeletedChat',
    definition: (t) => {
        t.nonNull.id('id');
        t.nonNull.string('name');
        t.nonNull.field('createdBy', {
            type: 'User',
        });
        t.nonNull.list.field('members', {
            type: 'User',
        });
    },
});
//# sourceMappingURL=deleted-chat.js.map