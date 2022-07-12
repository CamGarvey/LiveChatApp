"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendCreatedSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.friendCreatedSubscription = (0, nexus_1.subscriptionField)('userFriendCreated', {
    type: 'Me',
    description: 'Subscribe to new friends',
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(backing_types_1.Subscription.UserFriendCreated), (payload, _, context) => {
        return payload.id === context.userId;
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=friend-created.subscription.js.map