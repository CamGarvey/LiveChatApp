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
exports.UsersQuery = exports.UserQuery = exports.FriendsQuery = exports.MeQuery = void 0;
const client_1 = require("@prisma/client");
const graphql_relay_1 = require("graphql-relay");
const nexus_1 = require("nexus");
exports.MeQuery = (0, nexus_1.queryField)('me', {
    type: 'Me',
    resolve: (_, __, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }),
});
exports.FriendsQuery = (0, nexus_1.queryField)('friends', {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)('Friend'))),
    resolve: (_, __, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user
            .findUnique({
            where: {
                id: userId,
            },
        })
            .friends();
    }),
});
exports.UserQuery = (0, nexus_1.queryField)('user', {
    type: 'UserResult',
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'id of user',
        })),
    },
    resolve: (_, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ctx.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }),
});
exports.UsersQuery = (0, nexus_1.queryField)((t) => {
    t.nonNull.connectionField('users', {
        type: 'UserResult',
        description: 'Find users',
        additionalArgs: {
            usernameFilter: (0, nexus_1.stringArg)({
                description: 'If set, filters users by given filter',
            }),
            orderBy: (0, nexus_1.arg)({
                type: 'UserOrderBy',
                description: 'How to order query',
            }),
        },
        resolve: (_, { after, first, usernameFilter, orderBy }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
            const offset = after ? (0, graphql_relay_1.cursorToOffset)(after) + 1 : 0;
            if (isNaN(offset))
                throw new Error('cursor is invalid');
            const where = client_1.Prisma.validator()({
                AND: [
                    {
                        id: {
                            not: userId,
                        },
                        OR: [
                            {
                                username: {
                                    contains: usernameFilter,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                name: {
                                    contains: usernameFilter,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    },
                ],
            });
            const [totalCount, items] = yield Promise.all([
                prisma.user.count({
                    where,
                }),
                prisma.user.findMany({
                    take: first,
                    skip: offset,
                    where,
                    orderBy: orderBy,
                }),
            ]);
            return (0, graphql_relay_1.connectionFromArraySlice)(items, { first, after }, { sliceStart: offset, arrayLength: totalCount });
        }),
    });
});
//# sourceMappingURL=user.query.js.map