"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGroupChatInput = void 0;
const nexus_1 = require("nexus");
exports.CreateGroupChatInput = (0, nexus_1.inputObjectType)({
    name: 'CreateGroupChatInput',
    definition: (t) => {
        t.string('name', {
            description: 'Name of the chat',
        });
        t.string('description', {
            description: 'Short description of the group chat',
        });
        t.list.nonNull.hashId('memberIds', {
            description: 'Ids of the users to be added to group chat',
        });
    },
});
//# sourceMappingURL=chat.input.js.map