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
exports.MessageInterface = void 0;
const nexus_1 = require("nexus");
exports.MessageInterface = (0, nexus_1.interfaceType)({
    name: 'MessageInterface',
    resolveType: (t) => {
        return t.deletedAt == null ? 'Message' : 'DeletedMessage';
    },
    definition: (t) => {
        t.nonNull.id('messageId');
        t.nonNull.string('createdById');
        t.nonNull.field('createdBy', {
            type: 'UserResult',
            resolve: (parent, __, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user.findUnique({
                    where: {
                        userId: parent.createdById || undefined,
                    },
                });
            }),
        });
        t.nonNull.boolean('isCreator', {
            resolve: (parent, _, { userId }) => {
                return parent.createdById === userId;
            },
        });
        t.date('deletedAt');
        t.nonNull.date('updatedAt');
        t.nonNull.date('createdAt');
        t.nonNull.string('chatId');
        t.nonNull.field('chat', {
            type: 'ChatResult',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.chat.findUnique({
                    where: {
                        chatId: parent.chatId || undefined,
                    },
                });
            }),
        });
    },
});
//# sourceMappingURL=message.interface.js.map