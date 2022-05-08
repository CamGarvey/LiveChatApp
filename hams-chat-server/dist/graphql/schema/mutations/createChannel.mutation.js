"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChannel = void 0;
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../types/channel"));
exports.createChannel = (0, nexus_1.mutationField)('createChannel', {
    type: channel_1.default,
    args: {
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        createdById: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        isDM: (0, nexus_1.nonNull)((0, nexus_1.booleanArg)()),
    },
    description: 'Create a Channel',
    resolve(_, { name, createdById, isDM }, { prisma }) {
        return prisma.channel.create({
            data: {
                name,
                createdById,
                isDM,
                members: {
                    connect: {
                        id: createdById,
                    },
                },
            },
        });
    },
});
//# sourceMappingURL=createChannel.mutation.js.map