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
exports.Request = void 0;
const nexus_1 = require("nexus");
exports.Request = (0, nexus_1.interfaceType)({
    name: 'Request',
    resolveType: (source) => {
        return 'chatId' in source ? 'ChatInvite' : 'FriendRequest';
    },
    definition: (t) => {
        t.nonNull.hashId('id');
        t.field('recipient', {
            type: 'User',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user.findUniqueOrThrow({
                    where: {
                        id: parent.recipientId,
                    },
                });
            }),
        });
        t.nonNull.hashId('recipientId');
        t.nonNull.field('status', {
            type: 'RequestStatus',
        });
        t.nonNull.boolean('isCreator', {
            resolve: (parent, _, { userId }) => __awaiter(void 0, void 0, void 0, function* () { return parent.createdById == userId; }),
        });
        t.nonNull.field('createdBy', {
            type: 'User',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user.findUniqueOrThrow({
                    where: {
                        id: parent.createdById,
                    },
                });
            }),
        });
        t.nonNull.hashId('createdById');
        t.nonNull.date('createdAt');
    },
});
//# sourceMappingURL=request.interface.js.map