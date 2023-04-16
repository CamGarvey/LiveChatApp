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
    name: 'Message',
    resolveType: (t) => {
        return t.deletedAt == null ? 'InstantMessage' : 'DeletedMessage';
    },
    definition: (t) => {
        t.nonNull.hashId('id');
        t.nonNull.hashId('createdById');
        t.nonNull.field('createdBy', {
            type: 'User',
            resolve: (parent, __, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user.findUniqueOrThrow({
                    where: {
                        id: parent.createdById || undefined,
                    },
                });
            }),
        });
        t.nonNull.boolean('isCreator', {
            resolve: (parent, _, { userId }) => {
                return parent.createdById === userId;
            },
        });
        t.nonNull.date('updatedAt');
        t.nonNull.date('createdAt');
        t.nonNull.hashId('chatId');
        t.nonNull.field('chat', {
            type: 'Chat',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.chat.findUniqueOrThrow({
                    where: {
                        id: parent.id || undefined,
                    },
                });
            }),
        });
    },
});
//# sourceMappingURL=message.interface.js.map