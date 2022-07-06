"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendCreatedSubscription = exports.FriendRequestDeletedSubscription = exports.FriendRequestCreatedSubscription = exports.MeSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.MeSubscription = (0, nexus_1.subscriptionField)('meChanged', {
    type: 'User',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.MeChanged), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.FriendRequestCreatedSubscription = (0, nexus_1.subscriptionField)('friendRequestCreated', {
    type: 'User',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.FriendRequestCreated), (payload, _, context) => {
        return payload.receiverId === context.userId;
    }),
    resolve(payload) {
        return payload.sender;
    },
});
exports.FriendRequestDeletedSubscription = (0, nexus_1.subscriptionField)('friendRequestDeleted', {
    type: 'User',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.FriendDeleted), (payload, _, context) => {
        return payload.receiverId === context.userId;
    }),
    resolve(payload) {
        return payload.sender;
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