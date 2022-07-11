"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Me = void 0;
const nexus_1 = require("nexus");
exports.Me = (0, nexus_1.objectType)({
    name: 'Me',
    definition: (t) => {
        t.implements('IUser', 'IKnownUser');
    },
});
//# sourceMappingURL=me.object.js.map