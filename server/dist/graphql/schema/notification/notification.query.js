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
exports.Notifications = void 0;
const nexus_1 = require("nexus");
exports.Notifications = (0, nexus_1.queryField)('notifications', {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)('Notification'))),
    description: 'Get all notifications for current user',
    resolve: (_, __, { prisma, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.findUniqueOrThrow({
            include: {
                requests: {
                    where: {
                        state: 'SENT',
                    },
                },
                alerts: true,
            },
            where: {
                id: currentUserId,
            },
        });
        return [...user.requests, ...user.alerts];
    }),
});
//# sourceMappingURL=notification.query.js.map