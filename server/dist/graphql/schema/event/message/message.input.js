"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMessageInput = exports.CreateMessageInput = void 0;
const nexus_1 = require("nexus");
exports.CreateMessageInput = (0, nexus_1.inputObjectType)({
    name: 'CreateMessageInput',
    definition: (t) => {
        t.nonNull.hashId('chatId', {
            description: 'Id of chat',
        });
        t.nonNull.string('content', {
            description: 'Content of message',
        });
    },
});
exports.UpdateMessageInput = (0, nexus_1.inputObjectType)({
    name: 'UpdateMessageInput',
    definition: (t) => {
        t.nonNull.hashId('messageId', {
            description: 'Id of message',
        });
        t.nonNull.string('content', {
            description: 'New content for message',
        });
    },
});
//# sourceMappingURL=message.input.js.map