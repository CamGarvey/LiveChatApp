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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMembersFromChannel = exports.addMembersToChannel = exports.updateChannel = exports.deleteChannel = exports.createChannel = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.createChannel = (0, nexus_1.mutationField)('createChannel', {
    type: 'Channel',
    args: {
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Name of the Channel',
        })),
        description: (0, nexus_1.stringArg)({
            description: 'Description of Channel',
        }),
        isPrivate: (0, nexus_1.booleanArg)({
            description: 'If the Channel should be private',
            default: true,
        }),
        memberIds: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be added to Channel',
        }))),
    },
    description: 'Create a Channel',
    resolve: (_, { name, description, isPrivate, memberIds }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const memberIdSet = new Set(memberIds);
        if (memberIdSet.has(userId)) {
            memberIdSet.delete(userId);
        }
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
            if (!user) {
                throw new Error('Failed to find user');
            }
            if (user.friends.length != memberIdSet.size) {
                throw new apollo_server_core_1.ForbiddenError('You are not friends with all of the users provided');
            }
        }
        memberIdSet.add(userId);
        return yield prisma.channel.create({
            data: {
                name,
                description,
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
        channelId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
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
    type: 'Channel',
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Channel to be updated',
        })),
        name: (0, nexus_1.stringArg)({
            description: 'Name of Channel',
        }),
        description: (0, nexus_1.stringArg)({
            description: 'Description of Channel',
        }),
        isPrivate: (0, nexus_1.booleanArg)({
            description: 'If the Channel should be private',
        }),
        addMembersId: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be added to Channel',
        }))),
        removeMembersId: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be removed from Channel',
        }))),
    },
    description: 'Update a Channel',
    resolve: (_, { channelId, name, description, isPrivate, addMembersId, removeMembersId }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = yield prisma.channel.findUnique({
            select: {
                createdById: true,
                members: {
                    select: {
                        id: true,
                    },
                },
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
        const updatedChannel = yield prisma.channel.update({
            data: {
                name,
                description,
                isPrivate,
                members: {
                    connect: addMembersId === null || addMembersId === void 0 ? void 0 : addMembersId.map((x) => ({ id: x })),
                    disconnect: removeMembersId === null || removeMembersId === void 0 ? void 0 : removeMembersId.map((x) => ({ id: x })),
                },
            },
            where: {
                id: channelId,
            },
        });
        const update = yield prisma.channelUpdate.create({
            data: {
                channel: {
                    connect: {
                        id: channelId,
                    },
                },
                createdBy: {
                    connect: {
                        id: userId,
                    },
                },
                name,
                description,
                memberIdsAdded: addMembersId,
                memberIdsRemoved: removeMembersId,
            },
        });
        console.log(update);
        pubsub.publish(subscriptions_enum_1.Subscription.ChannelUpdated, update);
        return updatedChannel;
    }),
});
exports.addMembersToChannel = (0, nexus_1.mutationField)('addMembersToChannel', {
    type: 'Channel',
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Id of Channel to add Users to',
        })),
        memberIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be added to Channel',
        })))),
    },
    description: 'Add Members into Channel',
    resolve: (_, { channelId, memberIds }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
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
        const channel = yield prisma.channel.update({
            data: {
                members: {
                    connect: memberIds.map((id) => ({ id })),
                },
            },
            where: {
                id: channelId,
            },
        });
        const update = yield prisma.channelUpdate.create({
            data: {
                channel: {
                    connect: {
                        id: channelId,
                    },
                },
                createdBy: {
                    connect: {
                        id: userId,
                    },
                },
                memberIdsAdded: memberIds,
            },
        });
        pubsub.publish(subscriptions_enum_1.Subscription.ChannelUpdated, update);
        return channel;
    }),
});
exports.removeMembersFromChannel = (0, nexus_1.mutationField)('removeMembersFromChannel', {
    type: 'Channel',
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        membersIds: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
    },
    description: 'Remove Members from Channel',
    resolve: (_, { channelId, membersIds }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
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
        const channel = yield prisma.channel.update({
            data: {
                members: {
                    disconnect: membersIds.map((id) => ({ id })),
                },
            },
            where: {
                id: channelId,
            },
        });
        const update = yield prisma.channelUpdate.create({
            data: {
                channel: {
                    connect: {
                        id: channelId,
                    },
                },
                createdBy: {
                    connect: {
                        id: userId,
                    },
                },
                memberIdsRemoved: membersIds,
            },
        });
        pubsub.publish(subscriptions_enum_1.Subscription.ChannelUpdated, update);
        return channel;
    }),
});
//# sourceMappingURL=channel.mutation.js.map