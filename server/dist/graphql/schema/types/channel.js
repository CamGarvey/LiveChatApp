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
exports.Chat = void 0;
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const nexus_1 = require("nexus");
const scalars_1 = require("./scalars");
exports.Chat = (0, nexus_1.objectType)({
    name: 'Chat',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.string('name');
        t.string('description');
        t.nonNull.field('createdAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('updatedAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('createdBy', {
            type: 'User',
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
            type: 'Message',
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
            type: 'User',
            resolve: (parent, _, { prisma }) => {
                return prisma.channel
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .members();
            },
        });
        t.nonNull.list.nonNull.field('updates', {
            type: 'ChatUpdate',
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.channel
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .updates();
            }),
        });
    },
});
//# sourceMappingURL=channel.js.map