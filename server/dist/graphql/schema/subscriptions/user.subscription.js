"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFriendRequestDeletedSubscription = exports.UserFriendRequestCreatedSubscription = exports.FriendRequestChangedSubscription = exports.UserFriendDeletedSubscription = exports.UserFriendCreatedSubscription = exports.FriendsSubscription = exports.UserSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.UserSubscription = (0, nexus_1.subscriptionField)('user', {
    type: 'User',
    description: 'Subscribe to any changes to current user',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator('user.*', { pattern: true }), (payload, _, context) => {
        console.log(payload);
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.FriendsSubscription = (0, nexus_1.subscriptionField)('userFriends', {
    type: 'User',
    description: `Subscribe to any changes to
       the friendships of the current user (incl requests)`,
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator('user.friend.*', { pattern: true }), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.UserFriendCreatedSubscription = (0, nexus_1.subscriptionField)('userFriendCreated', {
    type: 'User',
    description: 'Subscribe to new friends',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.UserFriendCreated), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.UserFriendDeletedSubscription = (0, nexus_1.subscriptionField)('userFriendDeleted', {
    type: 'User',
    description: 'Subscribe to unfriend events',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.UserFriendDeleted), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.FriendRequestChangedSubscription = (0, nexus_1.subscriptionField)('userFriendRequests', {
    type: 'User',
    description: 'Subscribe to any changes to the friend requests of the current user',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator('user.friend.request.*', { pattern: true }), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.UserFriendRequestCreatedSubscription = (0, nexus_1.subscriptionField)('userFriendRequestCreated', {
    type: 'User',
    description: 'Subscribe to new friend requests',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.UserFriendRequestReceived), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.UserFriendRequestDeletedSubscription = (0, nexus_1.subscriptionField)('userFriendRequestDeleted', {
    type: 'User',
    description: 'Subscribe to deleted friend requests',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_enum_1.Subscription.UserFriendRequestDeleted), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=user.subscription.js.map