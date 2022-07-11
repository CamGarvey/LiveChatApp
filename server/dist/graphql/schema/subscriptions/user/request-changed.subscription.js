"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestChangedSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
exports.requestChangedSubscription = (0, nexus_1.subscriptionField)('userFriendRequests', {
    type: 'Me',
    description: 'Subscribe to any changes to the friend requests of the current user',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator('user.friend.request.*', { pattern: true }), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=request-changed.subscription.js.map