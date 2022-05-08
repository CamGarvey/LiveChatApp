"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUsersFromChannel = exports.addUsersToChannel = exports.updateChannel = void 0;
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../types/channel"));
exports.updateChannel = (0, nexus_1.mutationField)('updateChannel', {
    type: channel_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        isDM: (0, nexus_1.nonNull)((0, nexus_1.booleanArg)()),
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Update a Channel',
    resolve(_, { id, name, isDM }, ctx) {
        return ctx.prisma.channel.update({
            data: {
                name,
                isDM,
            },
            where: {
                id,
            },
        });
    },
});
exports.addUsersToChannel = (0, nexus_1.mutationField)('addUsersToChannel', {
    type: channel_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        userIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.intArg)()))),
    },
    description: 'Add Users into Channel',
    resolve(_, { id, userIds }, { prisma }) {
        return prisma.channel.update({
            data: {
                members: {
                    connect: userIds.map((userId) => ({ id: userId })),
                },
            },
            where: {
                id,
            },
        });
    },
});
exports.removeUsersFromChannel = (0, nexus_1.mutationField)('removeUsersFromChannel', {
    type: channel_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        userIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.intArg)()))),
    },
    description: 'Remove Users from Channel',
    resolve(_, { id, userIds }, { prisma }) {
        return prisma.channel.update({
            data: {
                members: {
                    disconnect: userIds.map((userId) => ({ id: userId })),
                },
            },
            where: {
                id,
            },
        });
    },
});
//# sourceMappingURL=updateChannel.mutation.js.map