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
exports.MessagesQuery = exports.MessageQuery = void 0;
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const nexus_1 = require("nexus");
const shared_1 = require("../shared");
exports.MessageQuery = (0, nexus_1.queryField)('message', {
    type: 'InstantMessage',
    description: 'Get a message by id',
    args: {
        messageId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'id of message',
        })),
    },
    authorize: (_, { messageId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canViewMessage(messageId); }),
    resolve: (_, { messageId }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.message.findUniqueOrThrow({
            where: {
                id: messageId,
            },
        });
    }),
});
exports.MessagesQuery = (0, nexus_1.queryField)((t) => {
    t.nonNull.connectionField('messages', {
        type: 'Message',
        additionalArgs: {
            chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
        },
        authorize: (_, { chatId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canViewChat(chatId); }),
        resolve: (_, { chatId, after, first, before, last }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
            return (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => {
                return prisma.message.findMany(Object.assign(Object.assign({}, args), {
                    where: { chatId },
                    orderBy: {
                        createdAt: 'asc',
                    },
                }));
            }, () => prisma.message.count({
                where: {
                    id: chatId,
                },
            }), { after, first, before, last }, {
                getCursor: (record) => ({ id: record.id }),
                encodeCursor: (cursor) => Buffer.from(JSON.stringify(cursor)).toString('base64'),
                decodeCursor: (cursor) => JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
            });
        }),
    });
});
//# sourceMappingURL=message.query.js.map