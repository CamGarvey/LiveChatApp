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
exports.Request = void 0;
const nexus_1 = require("nexus");
exports.Request = (0, nexus_1.interfaceType)({
    name: 'Request',
    description: `Request is a type of notification that requires a response 
    and is sent to a single user`,
    resolveType: (source) => {
        switch (source.type) {
            case 'FRIEND_REQUEST':
                return 'FriendRequest';
            default:
                return null;
        }
    },
    definition: (t) => {
        t.implements('Notification');
        t.nonNull.field('recipient', {
            type: 'User',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user.findUniqueOrThrow({
                    where: {
                        id: parent.recipientId,
                    },
                });
            }),
        });
        t.nonNull.hashId('recipientId');
        t.nonNull.field('state', {
            type: 'RequestState',
        });
    },
});
//# sourceMappingURL=request.interface.js.map