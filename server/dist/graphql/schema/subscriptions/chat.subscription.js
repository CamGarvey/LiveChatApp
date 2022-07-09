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
exports.chatDeletedSubscription = exports.chatCreatedSubscription = exports.chatUpdatedSubscription = exports.chatsSubscription = exports.ChatPayload = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
exports.ChatPayload = (0, nexus_1.unionType)({
    name: 'ChatPayload',
    definition: (t) => {
        t.members('ChatUpdate', 'Chat', 'DeletedChat');
    },
});
exports.chatsSubscription = (0, nexus_1.subscriptionField)('chats', {
    type: 'ChatPayload',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator('chat.*', { pattern: true }), (payload, _, context) => {
            return payload.members
                .map((x) => x.id)
                .includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
exports.chatUpdatedSubscription = (0, nexus_1.subscriptionField)('chatUpdated', {
    type: 'ChatUpdate',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(subscriptions_enum_1.Subscription.ChatUpdated), (payload, _) => {
            console.log(payload);
            return true;
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
exports.chatCreatedSubscription = (0, nexus_1.subscriptionField)('chatCreated', {
    type: 'Chat',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(subscriptions_enum_1.Subscription.ChatCreated), (payload, _, context) => {
            return payload.members
                .map((x) => x.id)
                .includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
exports.chatDeletedSubscription = (0, nexus_1.subscriptionField)('chatDeleted', {
    type: 'DeletedChat',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(subscriptions_enum_1.Subscription.ChatDeleted), (payload, _, context) => {
            return payload.members
                .map((x) => x.id)
                .includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=chat.subscription.js.map