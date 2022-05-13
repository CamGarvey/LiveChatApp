"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelQuery = exports.ChannelsQuery = void 0;
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../types/channel"));
exports.ChannelsQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.list.field('Channels', {
            type: channel_1.default,
            args: {
                userId: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
                    description: 'Channels user is a member of',
                })),
            },
            resolve: (_, { userId }, ctx) => {
                return ctx.prisma.channel.findMany({
                    where: {
                        members: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                });
            },
        });
    },
});
exports.ChannelQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.field('Channel', {
            type: channel_1.default,
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
                    description: 'id of channel',
                })),
            },
            resolve: (_, { id }, ctx) => {
                return ctx.prisma.channel.findUnique({
                    where: {
                        id: id,
                    },
                });
            },
        });
    },
});
//# sourceMappingURL=channel.query.js.map