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
exports.ChatUpdate = void 0;
const nexus_1 = require("nexus");
const scalars_1 = require("./scalars");
exports.ChatUpdate = (0, nexus_1.objectType)({
    name: 'ChatUpdate',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('chat', {
            type: 'ChatResult',
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.chat.findUnique({
                    where: {
                        id: parent.chatId,
                    },
                });
            }),
        });
        t.nonNull.id('chatId');
        t.nonNull.field('createdAt', {
            type: scalars_1.DateScalar,
        });
        t.field('createdBy', {
            type: 'User',
        });
        t.nonNull.id('createdById');
        t.string('name');
        t.string('description');
        t.list.nonNull.id('memberIdsAdded');
        t.list.nonNull.id('memberIdsRemoved');
        t.list.nonNull.field('membersAdded', {
            type: 'User',
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.user.findMany({
                    where: {
                        id: {
                            in: parent.memberIdsAdded,
                        },
                    },
                });
            }),
        });
        t.list.nonNull.field('membersRemoved', {
            type: 'User',
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.user.findMany({
                    where: {
                        id: {
                            in: parent.memberIdsRemoved,
                        },
                    },
                });
            }),
        });
    },
});
//# sourceMappingURL=chat-update.js.map