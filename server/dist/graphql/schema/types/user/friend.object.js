"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friend = void 0;
const nexus_1 = require("nexus");
exports.Friend = (0, nexus_1.objectType)({
    name: 'Friend',
    definition: (t) => {
        t.implements('IUser', 'IKnownUser');
    },
});
//# sourceMappingURL=friend.object.js.map