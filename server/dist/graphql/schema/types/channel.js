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
const graphql_relay_1 = require("graphql-relay");
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("./message"));
const scalars_1 = require("./scalars");
const user_1 = __importDefault(require("./user"));
const Channel = (0, nexus_1.objectType)({
    name: 'Channel',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.field('createdAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('updatedAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('createBy', {
            type: user_1.default,
            resolve: (parent, _, { prisma }) => {
                return prisma.user.findUnique({
                    where: {
                        id: parent.id,
                    },
                });
            },
        });
        t.nonNull.connectionField('messages', {
            type: message_1.default,
            resolve: (_, { after, first }, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                const offset = after ? (0, graphql_relay_1.cursorToOffset)(after) + 1 : 0;
                if (isNaN(offset))
                    throw new Error('cursor is invalid');
                const [totalCount, items] = yield Promise.all([
                    prisma.message.count(),
                    prisma.message.findMany({
                        take: first,
                        skip: offset,
                    }),
                ]);
                return (0, graphql_relay_1.connectionFromArraySlice)(items, { first, after }, { sliceStart: offset, arrayLength: totalCount });
            }),
        });
        t.nonNull.boolean('isDM');
        t.nonNull.int('memberCount', {
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                const members = yield prisma.channel
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .members();
                return members.length;
            }),
        });
        t.nonNull.list.nonNull.field('members', {
            type: user_1.default,
            resolve: (parent, _, { prisma }) => {
                return prisma.channel
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .members();
            },
        });
    },
});
exports.default = Channel;
//# sourceMappingURL=channel.js.map