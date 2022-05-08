"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const nexus_1 = require("nexus");
const user_1 = __importDefault(require("../types/user"));
exports.updateUser = (0, nexus_1.mutationField)('updateUser', {
    type: user_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Update a User',
    resolve(_, { id, email, username }, { prisma }) {
        return prisma.user.update({
            data: {
                email,
                username,
            },
            where: {
                id,
            },
        });
    },
});
//# sourceMappingURL=updateUser.mutation.js.map