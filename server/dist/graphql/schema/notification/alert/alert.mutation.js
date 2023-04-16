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
exports.AcknowledgeAlertMutation = void 0;
const nexus_1 = require("nexus");
const shared_1 = require("../../shared");
exports.AcknowledgeAlertMutation = (0, nexus_1.mutationField)('acknowledgeAlert', {
    type: 'Alert',
    description: `
    By acknowledging an alert, you'll be removed from the recipients.
    The alert will be deleted if all recipients have acknowledged it`,
    args: {
        alertId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)()),
    },
    resolve: (_, { alertId }, { prisma, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        const alert = yield prisma.alert.update({
            data: {
                recipients: {
                    disconnect: {
                        id: currentUserId,
                    },
                },
            },
            include: {
                recipients: {
                    select: {
                        id: true,
                    },
                },
            },
            where: {
                id: alertId,
            },
        });
        if (alert.recipients.length === 0) {
            yield prisma.alert.delete({
                where: {
                    id: alertId,
                },
            });
        }
        return alert;
    }),
});
//# sourceMappingURL=alert.mutation.js.map