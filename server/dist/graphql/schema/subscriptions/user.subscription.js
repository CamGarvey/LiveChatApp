"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendCreatedSubscription = exports.FriendRequestCreatedSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.FriendRequestCreatedSubscription = (0, nexus_1.subscriptionField)('friendRequestCreated', {
    type: 'User',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.FriendRequestCreated), (payload, _, context) => {
        return payload.userId === context.userId;
    }),
    resolve(payload) {
        return payload.friend;
    },
});
exports.FriendCreatedSubscription = (0, nexus_1.subscriptionField)('friendCreated', {
    type: 'User',
    args: {
        userId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.FriendCreated), (payload, _, context) => {
        return payload.receiverId === context.userId;
    }),
    resolve(payload) {
        return payload.friend;
    },
});
//# sourceMappingURL=user.subscription.js.map