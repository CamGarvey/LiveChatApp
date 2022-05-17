"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMembersFromChannel = exports.addMembersToChannel = void 0;
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../../types/channel"));
exports.addMembersToChannel = (0, nexus_1.mutationField)('addMembersToChannel', {
    type: channel_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        userIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.intArg)()))),
    },
    description: 'Add Members into Channel',
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
exports.removeMembersFromChannel = (0, nexus_1.mutationField)('removeMembersFromChannel', {
    type: channel_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        membersIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.intArg)()))),
    },
    description: 'Remove Members from Channel',
    resolve(_, { id, membersIds }, { prisma }) {
        return prisma.channel.update({
            data: {
                members: {
                    disconnect: membersIds.map((id) => ({ id })),
                },
            },
            where: {
                id,
            },
        });
    },
});
//# sourceMappingURL=members.mutation.js.map