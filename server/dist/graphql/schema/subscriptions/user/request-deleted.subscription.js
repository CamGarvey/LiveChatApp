"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRequestDeletedSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const backing_types_1 = require("src/graphql/backing-types");
exports.friendRequestDeletedSubscription = (0, nexus_1.subscriptionField)('userFriendRequestDeleted', {
    type: 'Me',
    description: 'Subscribe to deleted friend requests',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(backing_types_1.Subscription.UserFriendRequestDeleted), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=request-deleted.subscription.js.map