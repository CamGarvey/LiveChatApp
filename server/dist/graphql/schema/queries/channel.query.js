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
exports.channelMessages = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const graphql_relay_1 = require("graphql-relay");
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("../types/message"));
exports.channelMessages = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.connectionField('channelMessages', {
            type: message_1.default,
            additionalArgs: {
                channelId: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
                    description: 'If set, filters users by given filter',
                })),
            },
            resolve: (_, { channelId, after, first }, { prisma, userId }) => __awaiter(this, void 0, void 0, function* () {
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
                const offset = after ? (0, graphql_relay_1.cursorToOffset)(after) + 1 : 0;
                if (isNaN(offset))
                    throw new Error('cursor is invalid');
                const [totalCount, items] = yield Promise.all([
                    prisma.message.count({
                        where: {
                            channelId,
                        },
                    }),
                    prisma.message.findMany({
                        take: first,
                        skip: offset,
                        where: {
                            channelId,
                        },
                    }),
                ]);
                return (0, graphql_relay_1.connectionFromArraySlice)(items, { first, after }, { sliceStart: offset, arrayLength: totalCount });
            }),
        });
    },
});
//# sourceMappingURL=channel.query.js.map