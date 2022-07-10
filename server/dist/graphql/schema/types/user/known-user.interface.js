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
exports.IKnownUser = void 0;
const graphql_relay_1 = require("graphql-relay");
const nexus_1 = require("nexus");
exports.IKnownUser = (0, nexus_1.interfaceType)({
    name: 'IKnownUser',
    resolveType: (source) => 'Friend',
    definition: (t) => {
        t.nonNull.list.nonNull.field('receivedFriendRequests', {
            type: 'User',
            resolve: (parent, _, { prisma }) => {
                return prisma.user
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .receivedFriendRequests();
            },
        });
        t.nonNull.list.nonNull.field('chats', {
            type: 'ChatResult',
            resolve: (parent, _, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
                if (parent.id == userId) {
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
                                isPrivate: false,
                            },
                            {
                                members: {
                                    every: {
                                        id: userId,
                                    },
                                },
                            },
                        ],
                    },
                });
            }),
        });
        t.nonNull.connectionField('friends', {
            type: 'User',
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
                                    id: parent.id,
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
//# sourceMappingURL=known-user.interface.js.map