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
const nexus_1 = require("nexus");
const shared_1 = require("../shared");
exports.MeQuery = (0, nexus_1.queryField)('me', {
    type: 'Me',
    resolve: (_, __, { currentUserId, dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.user.getUser(currentUserId); }),
});
exports.FriendsQuery = (0, nexus_1.queryField)((t) => {
    t.connectionField('friends', {
        type: 'Friend',
        totalCount: () => 1,
        resolve: (_, args, { currentUserId, dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.user.getFriends(currentUserId, args); }),
    });
});
exports.UserQuery = (0, nexus_1.queryField)('user', {
    type: 'User',
    args: {
        userId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'id of user',
        })),
    },
    resolve: (_, { userId }, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.user.getUser(userId); }),
});
exports.UsersQuery = (0, nexus_1.queryField)((t) => {
    t.nonNull.connectionField('users', {
        type: 'User',
        description: 'Find users',
        totalCount() {
            return 1;
        },
        resolve: (_, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.user.getUsers(args); }),
    });
});
//# sourceMappingURL=user.query.js.map