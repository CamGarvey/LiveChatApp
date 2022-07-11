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
exports.Chat = (0, nexus_1.objectType)({
    name: 'Chat',
    definition(t) {
        t.implements('IChat');
        t.nonNull.connectionField('messages', {
            type: 'IMessage',
            resolve: (parent, args, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                return yield (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => prisma.message.findMany(Object.assign(Object.assign({}, args), { where: { chatId: parent.id } })), () => prisma.message.count(Object.assign({ where: { chatId: parent.id } })), args);
            }),
        });
        t.nonNull.int('memberCount', {
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                const members = yield prisma.chat
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .members();
                return members.length;
            }),
        });
        t.nonNull.list.nonNull.field('members', {
            type: 'IUser',
            resolve: (parent, _, { prisma }) => {
                return prisma.chat
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .members();
            },
        });
    },
});
//# sourceMappingURL=chat.object.js.map