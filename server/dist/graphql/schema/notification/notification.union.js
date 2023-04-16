"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationUnion = void 0;
const nexus_1 = require("nexus");
exports.NotificationUnion = (0, nexus_1.unionType)({
    name: 'Notification',
    resolveType: (source) => {
        return 'chatId' in source ? 'ChatInvite' : 'FriendRequest';
    },
    definition: (t) => {
        t.members('FriendRequest', 'ChatInvite');
    },
});
//# sourceMappingURL=notification.union.js.map