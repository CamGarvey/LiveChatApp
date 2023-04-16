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
exports.Stranger = exports.Me = exports.Friend = void 0;
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const nexus_1 = require("nexus");
exports.Friend = (0, nexus_1.objectType)({
    name: 'Friend',
    definition: (t) => {
        t.implements('User', 'KnownUser');
    },
});
exports.Me = (0, nexus_1.objectType)({
    name: 'Me',
    definition: (t) => {
        t.implements('User', 'KnownUser');
        t.nonNull.list.nonNull.field('sentRequests', {
            type: 'Request',
            args: {
                state: 'RequestState',
            },
            resolve: (_, { state }, { prisma, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user
                    .findUniqueOrThrow({
                    where: {
                        id: currentUserId,
                    },
                })
                    .requestsSent({
                    where: {
                        state: state !== null && state !== void 0 ? state : undefined,
                    },
                });
            }),
        });
        t.nonNull.list.nonNull.field('requests', {
            type: 'Request',
            args: {
                state: 'RequestState',
            },
            resolve: (_, { state }, { prisma, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user
                    .findUniqueOrThrow({
                    where: {
                        id: currentUserId,
                    },
                })
                    .requests({
                    where: {
                        state: state !== null && state !== void 0 ? state : undefined,
                    },
                });
            }),
        });
    },
});
exports.Stranger = (0, nexus_1.objectType)({
    name: 'Stranger',
    definition: (t) => {
        t.implements('User');
        t.nonNull.connectionField('mutualFriends', {
            type: 'Friend',
            totalCount: () => 1,
            resolve: (parent, { after, first, before, last }, { prisma, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
                const where = {
                    AND: [
                        {
                            friends: {
                                some: {
                                    id: parent.id,
                                },
                            },
                        },
                        {
                            friends: {
                                some: {
                                    id: currentUserId,
                                },
                            },
                        },
                    ],
                };
                return (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => {
                    return prisma.user.findMany(Object.assign(Object.assign({}, args), {
                        where,
                    }));
                }, () => prisma.user.count({ where }), { after, first, before, last }, {
                    getCursor: (record) => ({ id: record.id }),
                    encodeCursor: (cursor) => Buffer.from(JSON.stringify(cursor)).toString('base64'),
                    decodeCursor: (cursor) => JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
                });
            }),
        });
        t.field('friendRequest', {
            type: 'FriendRequest',
            resolve: (parent, _, { prisma, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield prisma.user.findUniqueOrThrow({
                    where: {
                        id: currentUserId,
                    },
                    select: {
                        requests: {
                            where: {
                                type: 'FRIEND_REQUEST',
                                state: 'SENT',
                            },
                        },
                        requestsSent: {
                            where: {
                                type: 'FRIEND_REQUEST',
                                state: 'SENT',
                            },
                        },
                    },
                });
                let request = user.requests.find((x) => x.createdById === parent.id);
                if (request) {
                    return request;
                }
                request = user.requestsSent.find((x) => x.recipientId === parent.id);
                if (request) {
                    return request;
                }
                return null;
            }),
        });
    },
});
//# sourceMappingURL=user.object.js.map