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
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
class ChatDataSource {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getEvents(chatId, args) {
        return (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => this.prisma.event.findMany(Object.assign(Object.assign({}, args), { where: { chatId } })), () => this.getEventCount(chatId), args, {
            getCursor: (record) => ({ id: record.id }),
            encodeCursor: (cursor) => Buffer.from(JSON.stringify(cursor)).toString('base64'),
            decodeCursor: (cursor) => JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
        });
    }
    getEventCount(chatId) {
        return this.prisma.event.count({
            where: {
                chatId,
            },
        });
    }
    deleteChat(chatId) {
        throw new Error('Method not implemented.');
    }
    getChat(chatId) {
        return this.prisma.chat.findUniqueOrThrow({
            where: {
                id: chatId,
            },
        });
    }
    getMembers(chatId, args) {
        return (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => this.prisma.chat
            .findUniqueOrThrow({
            where: { id: chatId || undefined },
        })
            .members(Object.assign({}, args)), () => this.prisma.chat
            .findUniqueOrThrow(Object.assign({ where: { id: chatId || undefined } }, { select: {
                _count: {
                    select: {
                        members: true,
                    },
                },
            } }))
            .then((x) => x._count.members), args, {
            getCursor: (record) => ({ id: record.id }),
            encodeCursor: (cursor) => Buffer.from(JSON.stringify(cursor)).toString('base64'),
            decodeCursor: (cursor) => JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
        });
    }
    getMemberCount(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.chat
                .findUniqueOrThrow({
                where: { id: chatId },
                select: {
                    _count: {
                        select: {
                            members: true,
                        },
                    },
                },
            })
                .then((chat) => chat._count.members);
        });
    }
    getMember(chatId, userId) {
        return this.prisma.member.findUniqueOrThrow({
            where: {
                userId_chatId: {
                    chatId,
                    userId,
                },
            },
        });
    }
}
exports.default = ChatDataSource;
//# sourceMappingURL=chat-datasource.js.map