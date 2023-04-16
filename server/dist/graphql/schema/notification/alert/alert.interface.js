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
exports.ChatAccessAlert = exports.RequestResponseAlert = exports.Alert = void 0;
const nexus_1 = require("nexus");
exports.Alert = (0, nexus_1.interfaceType)({
    name: 'Alert',
    description: `Alert is a type of notification that does not require a response
    and can be sent to multiple users`,
    resolveType: (source) => {
        switch (source.type) {
            case 'CHAT_DELETED':
                return 'ChatDeletedAlert';
            case 'FRIEND_DELETED':
                return 'FriendDeletedAlert';
            case 'REQUEST_ACCEPTED':
                return 'RequestAcceptedAlert';
            case 'REQUEST_DECLINED':
                return 'RequestDeclinedAlert';
            case 'CHAT_ACCESS_REVOKED':
                return 'ChatMemberAccessRevokedAlert';
            case 'CHAT_ACCESS_GRANTED':
                return 'ChatMemberAccessGrantedAlert';
            case 'CHAT_ROLE_CHANGED':
                return 'ChatRoleChanged';
            default:
                return null;
        }
    },
    definition: (t) => {
        t.implements('Notification');
        t.nonNull.list.nonNull.field('recipients', {
            type: 'User',
            description: 'Users that recieved alert',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.alert
                    .findUniqueOrThrow({
                    where: {
                        id: parent.id,
                    },
                })
                    .recipients();
            }),
        });
    },
});
exports.RequestResponseAlert = (0, nexus_1.interfaceType)({
    name: 'RequestResponseAlert',
    description: 'A response alert for requests',
    resolveType: (source) => {
        switch (source.type) {
            case 'REQUEST_ACCEPTED':
                return 'RequestAcceptedAlert';
            case 'REQUEST_DECLINED':
                return 'RequestDeclinedAlert';
            default:
                return null;
        }
    },
    definition: (t) => {
        t.implements('Alert');
        t.nonNull.hashId('requestId', {
            description: 'Id of request associated with alert',
        });
        t.nonNull.field('request', {
            type: 'Request',
            description: 'Request associated with alert',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                return yield prisma.request.findUniqueOrThrow({
                    where: {
                        id: (_a = parent.requestId) !== null && _a !== void 0 ? _a : undefined,
                    },
                });
            }),
        });
    },
});
exports.ChatAccessAlert = (0, nexus_1.interfaceType)({
    name: 'ChatAccessAlert',
    description: 'An alert about chat access changes',
    resolveType: (source) => {
        switch (source.type) {
            case 'CHAT_ACCESS_REVOKED':
                return 'ChatMemberAccessRevokedAlert';
            case 'CHAT_ACCESS_GRANTED':
                return 'ChatMemberAccessGrantedAlert';
            case 'CHAT_ROLE_CHANGED':
                return 'ChatRoledChangedAlert';
            default:
                return null;
        }
    },
    definition: (t) => {
        t.implements('Alert');
        t.nonNull.hashId('chatId', {
            description: 'Id of chat associated with alert',
        });
        t.nonNull.field('chat', {
            type: 'Chat',
            description: 'Chat associated with alert',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                return yield prisma.chat.findUniqueOrThrow({
                    where: {
                        id: (_a = parent.chatId) !== null && _a !== void 0 ? _a : undefined,
                    },
                });
            }),
        });
    },
});
//# sourceMappingURL=alert.interface.js.map