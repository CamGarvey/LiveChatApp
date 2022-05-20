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
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Name of the Channel',
        })),
        isPrivate: (0, nexus_1.booleanArg)({
            description: 'If the Channel should be private',
            default: true,
        }),
        memberIds: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.intArg)({
            description: 'Ids of Users to be added to Channel',
        }))),
    },
    description: 'Create a Channel',
    resolve: (_, { name, isPrivate, memberIds }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const memberIdSet = new Set(memberIds);
        if (memberIdSet) {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    friends: {
                        where: {
                            id: {
                                in: memberIds,
                            },
                        },
                    },
                },
            });
            if (user.friends.length != memberIdSet.size) {
                throw new apollo_server_core_1.ForbiddenError('You are not friends with all of the users provided');
            }
        }
        if (!memberIdSet.has(userId)) {
            memberIdSet.add(userId);
        }
        return yield prisma.channel.create({
            data: {
                name,
                createdById: userId,
                isDM: false,
                isPrivate,
                members: {
                    connect: [...memberIdSet].map((id) => ({ id })),
                },
            },
        });
    }),
});
exports.deleteChannel = (0, nexus_1.mutationField)('deleteChannel', {
    type: 'Boolean',
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
            description: 'Id of Channel to be deleted',
        })),
    },
    description: 'Delete a Channel',
    resolve: (_, { channelId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = yield prisma.channel.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: channelId,
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
                id: channelId,
            },
        });
        return true;
    }),
});
exports.updateChannel = (0, nexus_1.mutationField)('updateChannel', {
    type: channel_1.default,
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
            description: 'Id of Channel to be updated',
        })),
        name: (0, nexus_1.stringArg)({
            description: 'Name of Channel',
        }),
        isPrivate: (0, nexus_1.booleanArg)({
            description: 'If the Channel should be private',
        }),
    },
    description: 'Update a Channel',
    resolve: (_, { channelId, name, isPrivate }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = yield prisma.channel.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: channelId,
            },
        });
        if (channel == null) {
            throw new apollo_server_core_1.UserInputError(`Channel with id: ${channelId}, not found`);
        }
        if (channel.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to update this channel');
        }
        return yield prisma.channel.update({
            data: {
                name,
                isPrivate,
            },
            where: {
                id: channelId,
            },
        });
    }),
});
exports.createDM = (0, nexus_1.mutationField)('createDM', {
    type: channel_1.default,
    description: 'Create Direct Message Channel',
    resolve: (_, __, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.channel.create({
            data: {
                name: null,
                createdById: userId,
                isDM: true,
                isPrivate: true,
                members: {
                    connect: [
                        {
                            id: userId,
                        },
                    ],
                },
            },
        });
    }),
});
exports.addMembersToChannel = (0, nexus_1.mutationField)('addMembersToChannel', {
    type: channel_1.default,
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
            description: 'Id of Channel to add Users to',
        })),
        memberIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.intArg)({
            description: 'Ids of Users to be added to Channel',
        })))),
    },
    description: 'Add Members into Channel',
    resolve: (_, { channelId, memberIds }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                memberOfChannels: {
                    where: {
                        id: channelId,
                    },
                },
                friends: {
                    where: {
                        id: {
                            in: memberIds,
                        },
                    },
                },
            },
        });
        if (user.memberOfChannels.length == 0) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to add members to this channel');
        }
        if (user.friends.length != memberIds.length) {
            throw new apollo_server_core_1.ForbiddenError('You are not friends with all of these users');
        }
        return yield prisma.channel.update({
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