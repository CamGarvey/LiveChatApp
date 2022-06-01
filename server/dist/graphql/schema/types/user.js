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
const graphql_relay_1 = require("graphql-relay");
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("./channel"));
const friend_status_1 = __importDefault(require("./friend-status"));
const scalars_1 = require("./scalars");
const User = (0, nexus_1.objectType)({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.string('name');
        t.nonNull.string('email');
        t.nonNull.string('username');
        t.nonNull.field('createdAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('updatedAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('friendStatus', {
            type: friend_status_1.default,
            resolve: (parent, _, { prisma, userId }) => __awaiter(this, void 0, void 0, function* () {
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
        t.nonNull.list.nonNull.field('sentFriendRequests', {
            type: User,
            resolve: (parent, _, { prisma }) => {
                return prisma.user
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .sentFriendRequests();
            },
        });
        t.nonNull.list.nonNull.field('receivedFriendRequests', {
            type: User,
            resolve: (parent, _, { prisma }) => {
                return prisma.user
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .receivedFriendRequests();
            },
        });
        t.nonNull.list.nonNull.field('channels', {
            type: channel_1.default,
            resolve: (parent, _, { prisma, userId }) => __awaiter(this, void 0, void 0, function* () {
                if (parent.id == userId) {
                    return yield prisma.user
                        .findUnique({
                        where: { id: parent.id || undefined },
                    })
                        .memberOfChannels();
                }
                return yield prisma.channel.findMany({
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
            type: User,
            resolve: (parent, { after, first }, { prisma }) => __awaiter(this, void 0, void 0, function* () {
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
exports.default = User;
//# sourceMappingURL=user.js.map