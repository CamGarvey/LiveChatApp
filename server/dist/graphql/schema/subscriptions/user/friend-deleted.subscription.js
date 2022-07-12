"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendDeletedSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.friendDeletedSubscription = (0, nexus_1.subscriptionField)('userFriendDeleted', {
    type: 'Me',
    description: 'Subscribe to unfriend events',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(backing_types_1.Subscription.UserFriendDeleted), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=friend-deleted.subscription.js.map