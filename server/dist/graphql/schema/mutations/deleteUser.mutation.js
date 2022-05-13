"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const nexus_1 = require("nexus");
const user_1 = __importDefault(require("../types/user"));
exports.deleteUser = (0, nexus_1.mutationField)('deleteUser', {
    type: user_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete a User',
    resolve(_, { id }, { prisma }) {
        return prisma.user.delete({
            where: {
                id,
            },
        });
    },
});
//# sourceMappingURL=deleteUser.mutation.js.map