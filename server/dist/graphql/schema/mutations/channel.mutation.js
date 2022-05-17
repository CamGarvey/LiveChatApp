"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMembersFromChannel = exports.addMembersToChannel = exports.createDM = exports.updateChannel = exports.deleteChannel = exports.createChannel = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../types/channel"));
exports.createChannel = (0, nexus_1.mutationField)('createChannel', {
    type: channel_1.default,
    args: {
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        isPrivate: (0, nexus_1.nonNull)((0, nexus_1.booleanArg)()),
    },
    description: 'Create a Channel',
    resolve: (_, { name, isPrivate }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.channel.create({
            data: {
                name,
                createdById: userId,
                isDM: false,
                isPrivate,
                members: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }),
});
exports.deleteChannel = (0, nexus_1.mutationField)('deleteChannel', {
    type: 'Boolean',
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete a Channel',
    resolve: (_, { id }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = yield prisma.channel.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: id,
            },
        });
        if (channel == null) {
            throw new apollo_server_core_1.ApolloError('Channel does not exist');
        }
        if (channel.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to delete this channel');
        }
        yield prisma.channel.delete({
            where: {
                id,
            },
        });
        return true;
    }),
});
exports.updateChannel = (0, nexus_1.mutationField)('updateChannel', {
    type: channel_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        name: (0, nexus_1.stringArg)(),
        isPrivate: (0, nexus_1.booleanArg)(),
    },
    description: 'Update a Channel',
    resolve: (_, { id, name, isPrivate }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = yield prisma.channel.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: id,
            },
        });
        if (channel == null) {
            throw new apollo_server_core_1.UserInputError(`Channel with id: ${id}, not found`);
        }
        if (channel.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to update this channel');
        }
        return prisma.channel.update({
            data: {
                name,
                isPrivate,
            },
            where: {
                id,
            },
        });
    }),
});
exports.createDM = (0, nexus_1.mutationField)('createDM', {
    type: channel_1.default,
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Create Direct Message Channel',
    resolve: (_, { friendId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const friends = yield prisma.user
            .findUnique({
            where: {
                id: userId,
            },
        })
            .friends();
        if (!friends.find((friend) => friend.id == friendId)) {
            throw new apollo_server_core_1.ForbiddenError('You are not friends with this user');
        }
        const existing = yield prisma.channel.findFirst({
            where: {
                isDM: true,
                members: {
                    every: {
                        AND: [
                            {
                                id: userId,
                            },
                            {
                                id: friendId,
                            },
                        ],
                    },
                },
            },
        });
        return existing == null
            ? yield prisma.channel.create({
                data: {
                    name: 'DM',
                    createdById: userId,
                    isDM: true,
                    isPrivate: true,
                    members: {
                        connect: [
                            {
                                id: userId,
                            },
                            {
                                id: friendId,
                            },
                        ],
                    },
                },
            })
            : existing;
    }),
});
exports.addMembersToChannel = (0, nexus_1.mutationField)('addMembersToChannel', {
    type: channel_1.default,
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        memberIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.intArg)()))),
    },
    description: 'Add Members into Channel',
    resolve: (_, { channelId, memberIds }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield prisma.channel
            .findUnique({
            where: {
                id: channelId,
            },
        })
            .members();
        if (!members.find((member) => member.id == userId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to add members to this channel');
        }
        return prisma.channel.update({
            data: {
                members: {
                    connect: memberIds.map((id) => ({ id })),
                },
            },
            where: {
                id: channelId,
            },
        });
    }),
});
exports.removeMembersFromChannel = (0, nexus_1.mutationField)('removeMembersFromChannel', {
    type: channel_1.default,
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        membersIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.intArg)()))),
    },
    description: 'Remove Members from Channel',
    resolve: (_, { channelId, membersIds }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield prisma.channel
            .findUnique({
            where: {
                id: channelId,
            },
        })
            .members();
        if (!members.find((member) => member.id == userId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to remove members from this channel');
        }
        return yield prisma.channel.update({
            data: {
                members: {
                    disconnect: membersIds.map((id) => ({ id })),
                },
            },
            where: {
                id: channelId,
            },
        });
    }),
});
//# sourceMappingURL=channel.mutation.js.map