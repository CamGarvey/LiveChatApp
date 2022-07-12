"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatInput = exports.CreateChatInput = void 0;
const nexus_1 = require("nexus");
exports.CreateChatInput = (0, nexus_1.inputObjectType)({
    name: 'CreateChatInputType',
    definition: (t) => {
        t.nonNull.string('name', {
            description: 'Name of the chat',
        });
        t.string('description', {
            description: 'Short description of the chat',
        });
        t.boolean('isPrivate', {
            description: 'If the chat should be private',
            default: true,
        });
        t.list.nonNull.id('memberIds', {
            description: 'Ids of the users to be added to chat',
        });
    },
});
exports.UpdateChatInput = (0, nexus_1.inputObjectType)({
    name: 'UpdateChatInputType',
    definition: (t) => {
        t.nonNull.id('id', {
            description: 'Id of chat to update',
        });
        t.string('name', {
            description: 'New name for chat',
        });
        t.string('description', {
            description: 'New description for chat',
        });
        t.boolean('isPrivate', {
            description: 'Change if the chat is private',
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