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
exports.IUser = void 0;
const nexus_1 = require("nexus");
exports.IUser = (0, nexus_1.interfaceType)({
    name: 'IUser',
    resolveType: (source) => 'Friend',
    definition: (t) => {
        t.nonNull.id('id');
        t.string('name');
        t.nonNull.string('username');
        t.nonNull.field('createdAt', {
            type: 'Date',
        });
        t.nonNull.field('updatedAt', {
            type: 'Date',
        });
        t.nonNull.field('friendStatus', {
            type: 'FriendStatus',
            resolve: (parent, _, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
                const friends = yield prisma.user
                    .findUnique({
                    where: { id: userId },
                })
                    .friends();
                const receivedFriendRequests = yield prisma.user
                    .findUnique({
                    where: { id: userId },
                })
                    .receivedFriendRequests();
                const sentFriendRequests = yield prisma.user
                    .findUnique({
                    where: { id: userId },
                })
                    .sentFriendRequests();
                if (friends.find((x) => x.id == parent.id)) {
                    return 'FRIEND';
                }
                if (receivedFriendRequests.find((x) => x.id == parent.id)) {
                    return 'REQUEST_RECEIVED';
                }
                if (sentFriendRequests.find((x) => x.id == parent.id)) {
                    return 'REQUEST_SENT';
                }
                return 'NOT_FRIEND';
            }),
        });
    },
});
//# sourceMappingURL=user.interface.js.map