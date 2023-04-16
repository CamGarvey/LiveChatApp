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
exports.FriendRequestSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
exports.FriendRequestSubscription = (0, nexus_1.subscriptionField)('friendRequests', {
    type: 'FriendRequest',
    description: 'Subscribe to friend requests',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator('notification.friendrequest.*', {
            pattern: true,
        }), (payload) => {
            return payload.recipients.includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload.content;
    },
});
//# sourceMappingURL=friend-request.subscription.js.map