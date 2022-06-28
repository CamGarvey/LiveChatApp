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
exports.channel = exports.channels = exports.channelMessages = void 0;
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
exports.channelMessages = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.connectionField('channelMessages', {
            type: 'Message',
            additionalArgs: {
                channelId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
                    description: 'If set, filters users by given filter',
                })),
            },
            resolve: (_, { channelId, after, first, before, last }, { prisma, userId }) => __awaiter(this, void 0, void 0, function* () {
                const members = yield prisma.channel
                    .findUnique({
                    where: {
                        id: channelId,
                    },
                })
                    .members();
                if (!members.find((member) => member.id == userId)) {
                    throw new apollo_server_core_1.ForbiddenError('You do not have permission to this channel');
                }
                return (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => {
                    return prisma.message.findMany(Object.assign(Object.assign({}, args), {
                        where: { channelId },
                        orderBy: {
                            createdAt: 'asc',
                        },
                    }));
                }, () => prisma.message.count({
                    where: {
                        channelId,
                    },
                }), { after, first, before, last });
            }),
        });
    },
});
exports.channels = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('channels', {
            type: 'Channel',
            resolve: (_, __, { prisma, userId }) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.user
                    .findUnique({
                    where: {
                        id: userId,
                    },
                })
                    .memberOfChannels();
            }),
        });
    },
});
exports.channel = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.field('channel', {
            type: 'Channel',
            args: {
                channelId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
                    description: 'Id of channel',
                })),
            },
            resolve: (_, { channelId }, { prisma, userId }) => __awaiter(this, void 0, void 0, function* () {
                const channel = yield prisma.channel.findUnique({
                    where: {
                        id: channelId,
                    },
                    include: {
                        members: {
                            where: {
                                id: userId,
                            },
                        },
                    },
                });
                if (!(channel === null || channel === void 0 ? void 0 : channel.members.length)) {
                    throw new apollo_server_core_1.ForbiddenError('You do not have permission to this channel');
                }
                return channel;
            }),
        });
    },
});
//# sourceMappingURL=channel.query.js.map