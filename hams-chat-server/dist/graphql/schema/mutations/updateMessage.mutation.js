"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessage = void 0;
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("../types/message"));
exports.updateMessage = (0, nexus_1.mutationField)('updateMessage', {
    type: message_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Update a Message',
    resolve(_, { id, content }, { prisma }) {
        return prisma.message.update({
            data: {
                content,
            },
            where: {
                id,
            },
        });
    },
});
//# sourceMappingURL=updateMessage.mutation.js.map