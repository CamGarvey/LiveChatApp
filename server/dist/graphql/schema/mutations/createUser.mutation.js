"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const nexus_1 = require("nexus");
const user_1 = __importDefault(require("../types/user"));
exports.createUser = (0, nexus_1.mutationField)('createUser', {
    type: user_1.default,
    args: {
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        email: (0, nexus_1.stringArg)(),
        username: (0, nexus_1.stringArg)(),
    },
    description: 'Create a User',
    resolve(_, { name, email, username }, { prisma }) {
        return prisma.user.create({
            data: {
                name,
                email: email !== null && email !== void 0 ? email : undefined,
                username,
            },
        });
    },
});
//# sourceMappingURL=createUser.mutation.js.map