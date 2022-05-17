"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMembersFromChannel = void 0;
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("src/graphql/schema/types/channel"));
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
//# sourceMappingURL=removeMembersFromChannel.mutation.js.map