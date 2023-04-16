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
exports.KnownUserInterface = exports.UserInterface = void 0;
const nexus_1 = require("nexus");
exports.UserInterface = (0, nexus_1.interfaceType)({
    name: 'User',
    resolveType: (source, { currentUserId, prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        if (source.id == currentUserId) {
            return 'Me';
        }
        const friends = yield prisma.user
            .findUniqueOrThrow({
            where: {
                id: currentUserId,
            },
        })
            .friends();
        return friends.map((x) => x.id).includes(source.id) ? 'Friend' : 'Stranger';
    }),
    definition: (t) => {
        t.nonNull.hashId('id');
        t.string('name');
        t.nonNull.string('username');
        t.nonNull.date('createdAt');
        t.nonNull.date('updatedAt');
    },
});
exports.KnownUserInterface = (0, nexus_1.interfaceType)({
    name: 'KnownUser',
    resolveType: (source, { currentUserId }) => {
        return currentUserId == source.id ? 'Me' : 'Friend';
    },
    definition: (t) => {
        t.nonNull.list.nonNull.field('chats', {
            type: 'Chat',
            resolve: (parent, _, { prisma, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
                if (parent.id == currentUserId) {
                    return yield prisma.user
                        .findUnique({
                        where: { id: parent.id || undefined },
                    })
                        .memberOfChats();
                }
                return yield prisma.chat.findMany({
                    where: {
                        OR: [
                            {
                                members: {
                                    every: {
                                        id: currentUserId,
                                    },
                                },
                            },
                        ],
                    },
                });
            }),
        });
        t.nonNull.connectionField('friends', {
            type: 'Friend',
            totalCount: () => 1,
            resolve: (parent, args, { prisma, dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.user.getFriends(parent.id, args); }),
        });
    },
});
//# sourceMappingURL=user.interface.js.map