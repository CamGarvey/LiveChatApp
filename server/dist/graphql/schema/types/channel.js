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
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("./message"));
const scalars_1 = require("./scalars");
const user_1 = __importDefault(require("./user"));
const Channel = (0, nexus_1.objectType)({
    name: 'Channel',
    definition(t) {
        t.nonNull.string('id');
        t.nonNull.string('name');
        t.nonNull.field('createdAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('updatedAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('createdBy', {
            type: user_1.default,
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                const channel = yield prisma.channel.findUnique({
                    where: {
                        id: parent.id,
                    },
                    include: {
                        createdBy: true,
                    },
                });
                return channel.createdBy;
            }),
        });
        t.nonNull.connectionField('messages', {
            type: message_1.default,
            resolve: (parent, args, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                return yield (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => prisma.message.findMany(Object.assign(Object.assign({}, args), { where: { channelId: parent.id } })), () => prisma.message.count(Object.assign({ where: { channelId: parent.id } })), args);
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