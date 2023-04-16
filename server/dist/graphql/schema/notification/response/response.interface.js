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
exports.Response = void 0;
const nexus_1 = require("nexus");
exports.Response = (0, nexus_1.interfaceType)({
    name: 'Response',
    resolveType: (source) => 'FriendRequestResponse',
    definition: (t) => {
        t.implements('Notification');
        t.nonNull.hashId('requestId');
        t.nonNull.field('request', {
            type: 'Request',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.request.findUniqueOrThrow({
                    where: {
                        notificationId: parent.requestId,
                    },
                });
            }),
        });
        t.nonNull.field('status', {
            type: 'ResponseStatus',
        });
    },
});
//# sourceMappingURL=response.interface.js.map