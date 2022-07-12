"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sort = exports.FriendStatus = void 0;
const nexus_1 = require("nexus");
exports.FriendStatus = (0, nexus_1.enumType)({
    name: 'FriendStatus',
    members: ['FRIEND', 'REQUEST_SENT', 'REQUEST_RECEIVED', 'NOT_FRIEND'],
});
exports.Sort = (0, nexus_1.enumType)({
    name: 'Sort',
    members: {
        asc: 'asc',
        desc: 'desc',
    },
});
//# sourceMappingURL=enum.js.map