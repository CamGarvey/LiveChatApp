"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const FriendStatus = (0, nexus_1.enumType)({
    name: 'FriendStatus',
    members: ['FRIEND', 'REQUEST_SENT', 'REQUEST_RECEIVED', 'NOT_FRIEND'],
});
exports.default = FriendStatus;
//# sourceMappingURL=friend-status.js.map