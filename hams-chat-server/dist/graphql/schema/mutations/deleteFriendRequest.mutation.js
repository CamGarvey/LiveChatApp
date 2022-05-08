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
exports.deleteFriendRequest = void 0;
const nexus_1 = require("nexus");
exports.deleteFriendRequest = (0, nexus_1.mutationField)('deleteFriendRequest', {
    type: 'Boolean',
    args: {
        userId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        friendId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete a received Friend Request',
    resolve: (_, { userId, friendId }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    sentFriendRequests: {
                        connect: {
                            id: friendId,
                        },
                    },
                },
            });
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }),
});
//# sourceMappingURL=deleteFriendRequest.mutation.js.map