"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedMessage = void 0;
const nexus_1 = require("nexus");
exports.DeletedMessage = (0, nexus_1.objectType)({
    name: 'DeletedMessage',
    definition: (t) => {
        t.implements('IMessage');
    },
});
//# sourceMappingURL=deleted-message.object.js.map