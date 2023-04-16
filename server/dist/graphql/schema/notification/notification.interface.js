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
exports.Notification = void 0;
const nexus_1 = require("nexus");
exports.Notification = (0, nexus_1.interfaceType)({
    name: 'Notification',
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
            case 'FRIEND_REQUEST':
                return 'FriendRequest';
            case 'CHAT_ACCESS_REVOKED':
                return 'ChatMemberAccessRevokedAlert';
            case 'CHAT_ACCESS_GRANTED':
                return 'ChatMemberAccessGrantedAlert';
            case 'CHAT_ROLE_CHANGED':
                return 'ChatRoleChangedAlert';
            default:
                return null;
        }
    },
    definition: (t) => {
        t.nonNull.hashId('id');
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
        t.nonNull.boolean('isCreator', {
            resolve: (parent, _, { currentUserId }) => __awaiter(void 0, void 0, void 0, function* () { return parent.createdById == currentUserId; }),
        });
        t.nonNull.hashId('createdById');
        t.nonNull.date('createdAt');
    },
});
//# sourceMappingURL=notification.interface.js.map