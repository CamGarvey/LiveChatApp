"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShip = void 0;
const nexus_1 = require("nexus");
exports.FriendShip = (0, nexus_1.objectType)({
    name: 'FriendShip',
    definition: (t) => {
        t.nonNull.field('me', {
            type: 'User',
        });
        t.nonNull.field('other', {
            type: 'User',
        });
    },
});
//# sourceMappingURL=friend-ship.js.map