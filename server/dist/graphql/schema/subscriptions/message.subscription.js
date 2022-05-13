"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessageSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("../types/message"));
const subscriptions_1 = require("../types/subscriptions");
const newMessagePayload = (0, nexus_1.objectType)({
    name: 'NewMessagePayload',
    definition(t) {
        t.nonNull.int('channelId');
        t.nonNull.field('message', {
            type: message_1.default,
        });
    },
});
exports.newMessageSubscription = (0, nexus_1.subscriptionField)('newMessage', {
    type: newMessagePayload,
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    subscribe: (0, graphql_subscriptions_1.withFilter)((_, __, { pubsub }) => pubsub.asyncIterator(subscriptions_1.Subscriptions.NEW_MESSAGE), (payload, variables) => {
        return payload.channelId === variables.channelId;
    }),
    resolve(payload) {
        console.log(payload);
        return payload;
    },
});
//# sourceMappingURL=message.subscription.js.map