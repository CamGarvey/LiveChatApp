"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestDeletedSubscription = exports.FriendRequestCreatedSubscription = exports.RequestChangedSubscription = exports.FriendDeletedSubscription = exports.FriendCreatedSubscription = exports.FriendsSubscription = exports.UserSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
exports.UserSubscription = (0, nexus_1.subscriptionField)('user', {
    type: 'Me',
    description: 'Subscribe to any changes to current user',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator('user.*', { pattern: true }), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.FriendsSubscription = (0, nexus_1.subscriptionField)('userFriends', {
    type: 'Me',
    description: `Subscribe to any changes to
       the friendships of the current user (incl requests)`,
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator('user.friend.*', { pattern: true }), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.FriendCreatedSubscription = (0, nexus_1.subscriptionField)('userFriendCreated', {
    type: 'Me',
    description: 'Subscribe to new friends',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(backing_types_1.Subscription.UserFriendCreated), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.FriendDeletedSubscription = (0, nexus_1.subscriptionField)('userFriendDeleted', {
    type: 'Me',
    description: 'Subscribe to unfriend events',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(backing_types_1.Subscription.UserFriendDeleted), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.RequestChangedSubscription = (0, nexus_1.subscriptionField)('userFriendRequests', {
    type: 'Me',
    description: 'Subscribe to any changes to the friend requests of the current user',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator('user.friend.request.*', { pattern: true }), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.FriendRequestCreatedSubscription = (0, nexus_1.subscriptionField)('userFriendRequestCreated', {
    type: 'Me',
    description: 'Subscribe to new friend requests',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(backing_types_1.Subscription.UserFriendRequestReceived), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
exports.FriendRequestDeletedSubscription = (0, nexus_1.subscriptionField)('userFriendRequestDeleted', {
    type: 'Me',
    description: 'Subscribe to deleted friend requests',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(backing_types_1.Subscription.UserFriendRequestDeleted), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=user.subscription.js.map