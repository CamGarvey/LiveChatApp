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
const backing_types_1 = require("src/graphql/backing-types");
class RequestDataSource {
    constructor(prisma, pubsub) {
        this.prisma = prisma;
        this.pubsub = pubsub;
    }
    sendFriendRequest(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.prisma.request.upsert({
                create: {
                    type: 'FRIEND_REQUEST',
                    recipient: {
                        connect: {
                            id: userId,
                        },
                    },
                    createdBy: {
                        connect: {
                            id: this.currentUserId,
                        },
                    },
                },
                update: {
                    state: 'SENT',
                    createdAt: new Date().toISOString(),
                },
                where: {
                    recipientId_createdById_type: {
                        type: 'FRIEND_REQUEST',
                        createdById: this.currentUserId,
                        recipientId: userId,
                    },
                },
            });
            this.pubsub.publish(backing_types_1.Subscription.RequestSent, {
                recipients: [userId],
                content: request,
            });
            return request;
        });
    }
}
exports.default = RequestDataSource;
//# sourceMappingURL=request-datasource.js.map