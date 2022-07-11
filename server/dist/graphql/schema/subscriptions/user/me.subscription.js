"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
exports.UserSubscription = (0, nexus_1.subscriptionField)('me', {
    type: 'Me',
    description: 'Subscribe to any changes to current user',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator('user.*', { pattern: true }), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=me.subscription.js.map