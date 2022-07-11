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
exports.messages = void 0;
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
exports.messages = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.connectionField('messages', {
            type: 'MessageResult',
            additionalArgs: {
                chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
                    description: 'If set, filters users by given filter',
                })),
            },
            resolve: (_, { chatId, after, first, before, last }, { prisma, userId }) => __awaiter(this, void 0, void 0, function* () {
                const members = yield prisma.chat
                    .findUnique({
                    where: {
                        id: chatId,
                    },
                })
                    .members();
                if (!members.find((member) => member.id == userId)) {
                    throw new apollo_server_core_1.ForbiddenError('You do not have permission to this chat');
                }
                return (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => {
                    return prisma.message.findMany(Object.assign(Object.assign({}, args), {
                        where: { chatId },
                        orderBy: {
                            createdAt: 'asc',
                        },
                    }));
                }, () => prisma.message.count({
                    where: {
                        chatId,
                    },
                }), { after, first, before, last });
            }),
        });
    },
});
//# sourceMappingURL=messages.query.js.map