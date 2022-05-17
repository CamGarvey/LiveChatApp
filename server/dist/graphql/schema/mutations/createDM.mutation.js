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
exports.createDM = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../types/channel"));
exports.createDM = (0, nexus_1.mutationField)('createDM', {
    type: channel_1.default,
    args: {
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Create Direct Message Channel',
    resolve: (_, { friendId }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const friends = yield prisma.user
            .findUnique({
            where: {
                id: userId,
            },
        })
            .friends();
        if (!friends.find((friend) => friend.id == friendId)) {
            throw new apollo_server_core_1.ForbiddenError('You are not friends with this user');
        }
        const channel = yield prisma.channel.create({
            data: {
                name: 'DM',
                createdById: userId,
                isDM: true,
                isPrivate: true,
                members: {
                    connect: [
                        {
                            id: userId,
                        },
                        {
                            id: friendId,
                        },
                    ],
                },
            },
        });
        return channel;
    }),
});
//# sourceMappingURL=createDM.mutation.js.map