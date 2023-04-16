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
const prisma_relay_cursor_connection_1 = require("@devoxa/prisma-relay-cursor-connection");
const client_1 = require("@prisma/client");
class UserDataSource {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getUsers(args) {
        const where = this.getUserWhereValidator(args.filter);
        return (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => this.prisma.user.findMany(Object.assign(Object.assign({}, args), { where })), () => this.prisma.user.count({ where }), args, {
            getCursor: (record) => ({ id: record.id }),
            encodeCursor: (cursor) => Buffer.from(JSON.stringify(cursor)).toString('base64'),
            decodeCursor: (cursor) => JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
        });
    }
    getUser(userId) {
        return this.prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
        });
    }
    getFriends(userId, args) {
        const where = this.getUserWhereValidator(args.filter);
        return (0, prisma_relay_cursor_connection_1.findManyCursorConnection)((args) => this.prisma.user.findMany(Object.assign(Object.assign({}, args), {
            where: Object.assign({ friendsOf: {
                    some: {
                        id: userId,
                    },
                } }, where),
            orderBy: {
                createdAt: 'asc',
            },
        })), () => this.prisma.user.count({
            where: Object.assign({ friendsOf: {
                    some: {
                        id: userId,
                    },
                } }, where),
        }), args, {
            getCursor: (record) => ({ id: record.id }),
            encodeCursor: (cursor) => Buffer.from(JSON.stringify(cursor)).toString('base64'),
            decodeCursor: (cursor) => JSON.parse(Buffer.from(cursor, 'base64').toString('ascii')),
        });
    }
    deleteFriend(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    friends: {
                        disconnect: {
                            id: this.currentUserId,
                        },
                    },
                    friendsOf: {
                        disconnect: {
                            id: this.currentUserId,
                        },
                    },
                },
            });
        });
    }
    getUserWhereValidator(filter) {
        return client_1.Prisma.validator()({
            AND: [
                {
                    OR: [
                        {
                            username: {
                                contains: filter !== null && filter !== void 0 ? filter : undefined,
                                mode: 'insensitive',
                            },
                        },
                        {
                            name: {
                                contains: filter !== null && filter !== void 0 ? filter : undefined,
                                mode: 'insensitive',
                            },
                        },
                    ],
                },
            ],
        });
    }
}
exports.default = UserDataSource;
//# sourceMappingURL=user-datasource.js.map