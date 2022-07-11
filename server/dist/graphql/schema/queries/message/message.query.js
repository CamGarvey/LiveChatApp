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
exports.message = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
exports.message = (0, nexus_1.queryField)('message', {
    type: 'MessageResult',
    description: 'Get a message by id',
    args: {
        messageId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'id of message',
        })),
    },
    resolve: (_, { messageId }, { userId, prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.findUnique({
            where: {
                id: messageId,
            },
            include: {
                chat: {
                    include: {
                        members: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        if (!message) {
            throw new apollo_server_core_1.UserInputError('Not found');
        }
        console.log({ message });
        if (!message.chat.members.map((x) => x.id).includes(userId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to view this message');
        }
        return message;
    }),
});
//# sourceMappingURL=message.query.js.map