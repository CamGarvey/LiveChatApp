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
exports.ChatAdminAccessGrantedAlert = exports.ChatAdminAccessRevokedAlert = exports.ChatMemberAccessGrantedAlert = exports.ChatMemberAccessRevokedAlert = exports.ChatDeletedAlert = exports.FriendDeletedAlert = exports.RequestDeclinedAlert = exports.RequestAcceptedAlert = void 0;
const nexus_1 = require("nexus");
exports.RequestAcceptedAlert = (0, nexus_1.objectType)({
    name: 'RequestAcceptedAlert',
    definition: (t) => {
        t.implements('RequestResponseAlert');
    },
});
exports.RequestDeclinedAlert = (0, nexus_1.objectType)({
    name: 'RequestDeclinedAlert',
    definition: (t) => {
        t.implements('RequestResponseAlert');
    },
});
exports.FriendDeletedAlert = (0, nexus_1.objectType)({
    name: 'FriendDeletedAlert',
    definition: (t) => {
        t.implements('Alert');
        t.nonNull.field('user', {
            type: 'Stranger',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const alert = yield prisma.alert.findUniqueOrThrow({
                    where: {
                        id: (_a = parent.id) !== null && _a !== void 0 ? _a : undefined,
                    },
                    include: {
                        createdBy: true,
                    },
                });
                return alert.createdBy;
            }),
        });
    },
});
exports.ChatDeletedAlert = (0, nexus_1.objectType)({
    name: 'ChatDeletedAlert',
    definition: (t) => {
        t.implements('Alert');
        t.nonNull.field('chat', {
            type: 'Chat',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                const chat = yield prisma.alert
                    .findUniqueOrThrow({
                    where: {
                        id: (_a = parent.id) !== null && _a !== void 0 ? _a : undefined,
                    },
                })
                    .chat();
                if (!chat) {
                    throw new Error('Failed to find chat');
                }
                return chat;
            }),
        });
    },
});
exports.ChatMemberAccessRevokedAlert = (0, nexus_1.objectType)({
    name: 'ChatMemberAccessRevokedAlert',
    definition: (t) => {
        t.implements('ChatAccessAlert');
    },
});
exports.ChatMemberAccessGrantedAlert = (0, nexus_1.objectType)({
    name: 'ChatMemberAccessGrantedAlert',
    definition: (t) => {
        t.implements('ChatAccessAlert');
    },
});
exports.ChatAdminAccessRevokedAlert = (0, nexus_1.objectType)({
    name: 'ChatAdminAccessRevokedAlert',
    definition: (t) => {
        t.implements('ChatAccessAlert');
    },
});
exports.ChatAdminAccessGrantedAlert = (0, nexus_1.objectType)({
    name: 'ChatAdminAccessGrantedAlert',
    definition: (t) => {
        t.implements('ChatAccessAlert');
    },
});
//# sourceMappingURL=alert.object.js.map