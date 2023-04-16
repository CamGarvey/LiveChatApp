"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDeletedSubscription = exports.ChatCreatedSubscription = exports.ChatsSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
exports.ChatsSubscription = (0, nexus_1.subscriptionField)('chats', {
    type: 'ChatSubscriptionResult',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator('chat.*', { pattern: true }), (payload) => {
            return payload.recipients.includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload.content;
    },
});
exports.ChatCreatedSubscription = (0, nexus_1.subscriptionField)('chatCreated', {
    type: 'Chat',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.ChatCreated), (payload) => {
            return payload.recipients.includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload.content;
    },
});
exports.ChatDeletedSubscription = (0, nexus_1.subscriptionField)('chatDeleted', {
    type: 'DeletedChat',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.ChatDeleted), (payload) => {
            return payload.recipients.includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload.content;
    },
});
//# sourceMappingURL=chat.subscription.js.map