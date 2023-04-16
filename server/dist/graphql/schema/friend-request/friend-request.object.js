"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequest = void 0;
const nexus_1 = require("nexus");
exports.FriendRequest = (0, nexus_1.objectType)({
    name: 'FriendRequest',
    definition: (t) => {
        t.implements('Request', 'Notification');
    },
});
//# sourceMappingURL=friend-request.object.js.map