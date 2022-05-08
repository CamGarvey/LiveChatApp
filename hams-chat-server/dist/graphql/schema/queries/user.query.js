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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQuery = exports.FriendsQuery = exports.UserIsFriendsQuery = exports.UsersQuery = void 0;
const client_1 = require("@prisma/client");
const graphql_relay_1 = require("graphql-relay");
const nexus_1 = require("nexus");
const enums_1 = require("../types/enums");
const user_1 = __importDefault(require("../types/user"));
const UserOrderBy = (0, nexus_1.inputObjectType)({
    name: 'UserOrderBy',
    definition(t) {
        t.field('username', {
            type: enums_1.Sort,
        });
        t.field('id', {
            type: enums_1.Sort,
        });
        t.field('name', {
            type: enums_1.Sort,
        });
        t.field('email', {
            type: enums_1.Sort,
        });
        t.field('username', {
            type: enums_1.Sort,
        });
        t.field('createdAt', {
            type: enums_1.Sort,
        });
        t.field('updatedAt', {
            type: enums_1.Sort,
        });
    },
});
exports.UsersQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.connectionField('Users', {
            type: user_1.default,
            additionalArgs: {
                nameFilter: (0, nexus_1.stringArg)({
                    description: 'If set, filters users by given filter',
                }),
                orderBy: (0, nexus_1.arg)({ type: UserOrderBy, description: 'How to order query' }),
            },
            resolve: (_, { after, first, nameFilter, orderBy }, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                const offset = after ? (0, graphql_relay_1.cursorToOffset)(after) + 1 : 0;
                if (isNaN(offset))
                    throw new Error('cursor is invalid');
                const whereNameIs = client_1.Prisma.validator()({
                    name: {
                        contains: nameFilter,
                    },
                });
                const [totalCount, items] = yield Promise.all([
                    prisma.user.count({
                        where: whereNameIs,
                    }),
                    prisma.user.findMany({
                        take: first,
                        skip: offset,
                        where: whereNameIs,
                        orderBy: orderBy,
                    }),
                ]);
                return (0, graphql_relay_1.connectionFromArraySlice)(items, { first, after }, { sliceStart: offset, arrayLength: totalCount });
            }),
        });
    },
});
exports.UserIsFriendsQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.connectionField('Users', {
            type: user_1.default,
            additionalArgs: {
                nameFilter: (0, nexus_1.stringArg)({
                    description: 'If set, filters users by given filter',
                }),
                orderBy: (0, nexus_1.arg)({ type: UserOrderBy, description: 'How to order query' }),
            },
            resolve: (_, { after, first, nameFilter, orderBy }, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                const offset = after ? (0, graphql_relay_1.cursorToOffset)(after) + 1 : 0;
                if (isNaN(offset))
                    throw new Error('cursor is invalid');
                const whereNameIs = client_1.Prisma.validator()({
                    name: {
                        contains: nameFilter,
                    },
                });
                const [totalCount, items] = yield Promise.all([
                    prisma.user.count({
                        where: whereNameIs,
                    }),
                    prisma.user.findMany({
                        take: first,
                        skip: offset,
                        where: whereNameIs,
                        orderBy: orderBy,
                    }),
                ]);
                return (0, graphql_relay_1.connectionFromArraySlice)(items, { first, after }, { sliceStart: offset, arrayLength: totalCount });
            }),
        });
    },
});
exports.FriendsQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('Friends', {
            type: user_1.default,
            args: {
                userId: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
                    description: 'Id of User',
                })),
            },
            resolve: (_, { userId }, ctx) => {
                return ctx.prisma.user
                    .findUnique({
                    where: {
                        id: userId,
                    },
                })
                    .friends();
            },
        });
    },
});
exports.UserQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.field('User', {
            type: user_1.default,
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
                    description: 'id of user',
                })),
            },
            resolve: (_, { id }, ctx) => {
                return ctx.prisma.user.findUnique({
                    where: {
                        id: id,
                    },
                });
            },
        });
    },
});
//# sourceMappingURL=user.query.js.map