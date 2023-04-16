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
exports.EventUpdatedSubscription = exports.EventDeletedSubscription = exports.EventCreatedSubscription = exports.EventsSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const shared_1 = require("../shared");
const backing_types_1 = require("../../backing-types");
exports.EventsSubscription = (0, nexus_1.subscriptionField)('events', {
    type: 'Event',
    description: 'Subscribe to any created/updated/deleted events',
    args: {
        chatId: (0, shared_1.hashIdArg)({
            description: 'Id of chat to subscribe to',
        }),
    },
    authorize: (_, { chatId }, { auth }) => chatId ? auth.canViewChat(chatId) : true,
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator('event.*', { pattern: true }), (payload, variables, context) => {
            if (variables.chatId) {
                return (payload.content.createdById !== context.currentUserId &&
                    payload.content.chatId == variables.chatId);
            }
            return payload.recipients.includes(context.currentUserId);
        })(rootValue, args, context);
    }),
    resolve: (payload) => payload.content,
});
exports.EventCreatedSubscription = (0, nexus_1.subscriptionField)('eventCreated', {
    type: 'Event',
    description: 'Subscribe to created events in chat',
    args: {
        chatId: (0, shared_1.hashIdArg)({
            description: 'Id of chat to subscribe to',
        }),
    },
    authorize: (_, { chatId }, { auth }) => chatId ? auth.canViewChat(chatId) : true,
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.EventCreated, {
            pattern: true,
        }), (payload, variables, context) => {
            if (variables.chatId) {
                return (payload.content.createdById !== context.currentUserId &&
                    payload.content.chatId == variables.chatId);
            }
            return payload.recipients.includes(context.currentUserId);
        })(rootValue, args, context);
    }),
    resolve: (payload) => payload.content,
});
exports.EventDeletedSubscription = (0, nexus_1.subscriptionField)('eventDeleted', {
    type: 'DeletedEvent',
    description: 'Subscribe to deleted events in chat',
    args: {
        chatId: (0, shared_1.hashIdArg)({
            description: 'Id of chat to subscribe to',
        }),
    },
    authorize: (_, { chatId }, { auth }) => chatId ? auth.canViewChat(chatId) : true,
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.EventDeleted, {
            pattern: true,
        }), (payload, variables, context) => {
            if (variables.chatId) {
                return (payload.content.createdById !== context.currentUserId &&
                    payload.content.chatId == variables.chatId);
            }
            return payload.recipients.includes(context.currentUserId);
        })(rootValue, args, context);
    }),
    resolve: (payload) => payload.content,
});
exports.EventUpdatedSubscription = (0, nexus_1.subscriptionField)('eventUpdated', {
    type: 'Event',
    description: 'Subscribe to updated events in chat',
    args: {
        chatId: (0, shared_1.hashIdArg)({
            description: 'Id of chat to subscribe to',
        }),
    },
    authorize: (_, { chatId }, { auth }) => chatId ? auth.canViewChat(chatId) : true,
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.EventUpdated, {
            pattern: true,
        }), (payload, variables, context) => {
            if (variables.chatId) {
                return (payload.content.createdById !== context.currentUserId &&
                    payload.content.chatId == variables.chatId);
            }
            return payload.recipients.includes(context.currentUserId);
        })(rootValue, args, context);
    }),
    resolve: (payload) => payload.content,
});
//# sourceMappingURL=event.subscription.js.map