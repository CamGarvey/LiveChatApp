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
const graphql_relay_1 = require("graphql-relay");
const nexus_1 = require("nexus");
exports.UserInterface = (0, nexus_1.interfaceType)({
    name: 'UserInterface',
    resolveType: (source) => __awaiter(void 0, void 0, void 0, function* () {
        return 'Friend';
    }),
    definition: (t) => {
        t.nonNull.id('userId');
        t.string('name');
        t.nonNull.string('username');
        t.nonNull.date('createdAt');
        t.nonNull.date('updatedAt');
        t.nonNull.field('friendStatus', {
            type: 'FriendStatus',
            resolve: (parent, _, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
                const friends = yield prisma.user
                    .findUnique({
                    where: { userId },
                })
                    .friends();
                const receivedFriendRequests = yield prisma.user
                    .findUnique({
                    where: { userId },
                })
                    .receivedFriendRequests();
                const sentFriendRequests = yield prisma.user
                    .findUnique({
                    where: { userId },
                })
                    .sentFriendRequests();
                if (friends.find((x) => x.id == parent.userId)) {
                    return 'FRIEND';
                }
                if (receivedFriendRequests.find((x) => x.id == parent.userId)) {
                    return 'REQUEST_RECEIVED';
                }
                if (sentFriendRequests.find((x) => x.id == parent.userId)) {
                    return 'REQUEST_SENT';
                }
                return 'NOT_FRIEND';
            }),
        });
    },
});
exports.KnownUserInterface = (0, nexus_1.interfaceType)({
    name: 'KnownUserInterface',
    resolveType: (source, { userId }) => {
        return userId == source.userId ? 'Me' : 'Friend';
    },
    definition: (t) => {
        t.nonNull.list.nonNull.field('receivedFriendRequests', {
            type: 'UserResult',
            resolve: (parent, _, { prisma }) => {
                return prisma.user
                    .findUnique({
                    where: { userId: parent.userId || undefined },
                })
                    .receivedFriendRequests();
            },
        });
        t.nonNull.list.nonNull.field('chats', {
            type: 'ChatResult',
            resolve: (parent, _, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
                if (parent.userId == userId) {
                    return yield prisma.user
                        .findUnique({
                        where: { userId: parent.userId || undefined },
                    })
                        .memberOfChats();
                }
                return yield prisma.chat.findMany({
                    where: {
                        OR: [
                            {
                                members: {
                                    every: {
                                        userId,
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
            resolve: (parent, { after, first }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                const offset = after ? (0, graphql_relay_1.cursorToOffset)(after) + 1 : 0;
                if (isNaN(offset))
                    throw new Error('cursor is invalid');
                const [totalCount, items] = yield Promise.all([
                    prisma.user.count(),
                    prisma.user.findMany({
                        take: first !== null && first !== void 0 ? first : undefined,
                        skip: offset,
                        where: {
                            friendsOf: {
                                some: {
                                    userId: parent.userId,
                                },
                            },
                        },
                    }),
                ]);
                return (0, graphql_relay_1.connectionFromArraySlice)(items, { first, after }, { sliceStart: offset, arrayLength: totalCount });
            }),
        });
    },
});
//# sourceMappingURL=user.interface.js.map