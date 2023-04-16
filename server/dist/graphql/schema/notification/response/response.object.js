"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestResponse = void 0;
const nexus_1 = require("nexus");
exports.FriendRequestResponse = (0, nexus_1.objectType)({
    name: 'FriendRequestResponse',
    definition: (t) => {
        t.implements('Response');
        t.nonNull.field('status', {
            type: 'ResponseStatus',
        });
    },
});
//# sourceMappingURL=response.object.js.map