"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = void 0;
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("../types/message"));
exports.deleteMessage = (0, nexus_1.mutationField)('deleteMessage', {
    type: message_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete a Message',
    resolve(_, { id }, { prisma }) {
        return prisma.message.delete({
            where: {
                id,
            },
        });
    },
});
//# sourceMappingURL=deleteMessage.mutation.js.map