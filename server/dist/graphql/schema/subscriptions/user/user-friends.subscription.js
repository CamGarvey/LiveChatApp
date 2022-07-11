"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
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
//# sourceMappingURL=user-friends.subscription.js.map