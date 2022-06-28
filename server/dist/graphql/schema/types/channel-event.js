"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelEvent = void 0;
const nexus_1 = require("nexus");
exports.ChannelEvent = (0, nexus_1.unionType)({
    name: 'ChannelEvent',
    description: 'Any event that can be rendered in the chat',
    definition(t) {
        t.members('Message', 'MembersAdded', 'MembersRemoved');
    },
});
//# sourceMappingURL=channel-event.js.map