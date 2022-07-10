"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedChat = void 0;
const nexus_1 = require("nexus");
exports.DeletedChat = (0, nexus_1.objectType)({
    name: 'DeletedChat',
    definition: (t) => {
        t.implements('IChat');
    },
});
//# sourceMappingURL=deleted-chat.object.js.map