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
exports.ChannelQuery = exports.ChannelsQuery = void 0;
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../types/channel"));
exports.ChannelsQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.list.field('Channels', {
            type: channel_1.default,
            resolve: (_, __, { prisma, userId }) => {
                return prisma.channel.findMany({
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
            resolve: (_, { id }, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.channel.findUnique({
                    where: {
                        id: id,
                    },
                });
            }),
        });
    },
});
//# sourceMappingURL=channel.query.js.map