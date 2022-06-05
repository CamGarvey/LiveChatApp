"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFriendSubscription = exports.newFriendRequestSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const subscriptions_1 = require("../types/subscriptions");
const user_1 = __importDefault(require("../types/user"));
exports.newFriendRequestSubscription = (0, nexus_1.subscriptionField)('newFriendRequest', {
    type: user_1.default,
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_1.Subscriptions.NEW_FRIEND_REQUEST), (payload, _, context) => {
        return payload.userId === context.userId;
    }),
    resolve(payload) {
        return payload.friend;
    },
});
exports.newFriendSubscription = (0, nexus_1.subscriptionField)('newFriend', {
    type: user_1.default,
    args: {
        userId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_1.Subscriptions.NEW_FRIEND), (payload, _, context) => {
        return payload.receiverId === context.userId;
    }),
    resolve(payload) {
        return payload.friend;
    },
});
//# sourceMappingURL=user.subscription.js.map