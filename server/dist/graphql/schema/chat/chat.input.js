"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatInput = exports.CreateGroupChatInput = void 0;
const nexus_1 = require("nexus");
exports.CreateGroupChatInput = (0, nexus_1.inputObjectType)({
    name: 'CreateGroupChatInput',
    definition: (t) => {
        t.nonNull.string('name', {
            description: 'Name of the chat',
        });
        t.string('description', {
            description: 'Short description of the group chat',
        });
        t.list.nonNull.id('memberIds', {
            description: 'Ids of the users to be added to group chat',
        });
    },
});
exports.UpdateChatInput = (0, nexus_1.inputObjectType)({
    name: 'UpdateChatInput',
    definition: (t) => {
        t.nonNull.id('chatId', {
            description: 'Id of chat to update',
        });
        t.string('name', {
            description: 'New name for chat',
        });
        t.string('description', {
            description: 'New description for chat',
        });
        t.list.nonNull.id('addMemberIds', {
            description: 'Ids of users to be add into the chat',
        });
        t.list.nonNull.id('removeMemberIds', {
            description: 'Ids of users to be removed from chat',
        });
    },
});
//# sourceMappingURL=chat.input.js.map