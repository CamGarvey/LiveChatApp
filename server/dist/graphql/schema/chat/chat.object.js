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
exports.DeletedChat = exports.GroupChat = exports.DirectMessageChat = void 0;
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const nexus_1 = require("nexus");
exports.DirectMessageChat = (0, nexus_1.objectType)({
    name: 'DirectMessageChat',
    description: 'A Direct Message Chat is a conversation between 2 members',
    definition: (t) => {
        t.implements('ChatInterface');
        t.nonNull.field('friend', {
            type: 'Friend',
            resolve: (parent, __, { userId, prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                const members = yield prisma.chat
                    .findUnique({
                    where: { chatId: parent.chatId || undefined },
                })
                    .members();
                return members.find((x) => x.userId !== userId);
            }),
        });
        t.nonNull.connectionField('messages', {
            type: 'MessageResult',
            resolve: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => prisma.message.findMany(Object.assign(Object.assign({}, args), { where: { chatId: parent.chatId } })), () => prisma.message.count(Object.assign({ where: { chatId: parent.chatId } })), args);
            }),
        });
    },
});
exports.GroupChat = (0, nexus_1.objectType)({
    name: 'GroupChat',
    description: 'A Group Chat is a chat that contains more than 2 members',
    definition: (t) => {
        t.implements('ChatInterface');
        t.nonNull.string('name');
        t.string('description');
        t.nonNull.int('memberCount', {
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                const members = yield prisma.chat
                    .findUnique({
                    where: { chatId: parent.chatId || undefined },
                })
                    .members();
                return members.length;
            }),
        });
        t.nonNull.list.nonNull.field('members', {
            type: 'UserResult',
            resolve: (parent, _, { prisma }) => {
                return prisma.chat
                    .findUnique({
                    where: { chatId: parent.chatId || undefined },
                })
                    .members();
            },
        });
    },
});
exports.DeletedChat = (0, nexus_1.objectType)({
    name: 'DeletedChat',
    definition: (t) => {
        t.implements('ChatInterface');
        t.nonNull.date('deletedAt');
    },
});
//# sourceMappingURL=chat.object.js.map