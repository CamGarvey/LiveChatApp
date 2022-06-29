"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFriendSubscription = exports.newFriendRequestSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.newFriendRequestSubscription = (0, nexus_1.subscriptionField)('newFriendRequest', {
    type: 'User',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscriptions.NEW_FRIEND_REQUEST), (payload, _, context) => {
        return payload.userId === context.userId;
    }),
    resolve(payload) {
        return payload.friend;
    },
});
exports.newFriendSubscription = (0, nexus_1.subscriptionField)('newFriend', {
    type: 'User',
    args: {
        userId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscriptions.NEW_FRIEND), (payload, _, context) => {
        return payload.receiverId === context.userId;
    }),
    resolve(payload) {
        return payload.friend;
    },
});
//# sourceMappingURL=user.subscription.js.map