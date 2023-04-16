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
exports.MessageUpdatedSubscription = exports.MessageDeletedSubscription = exports.MessageCreatedSubscription = exports.MessagesSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
const shared_1 = require("../shared");
exports.MessagesSubscription = (0, nexus_1.subscriptionField)('messages', {
    type: 'Message',
    description: 'Subscribe to any created/updated/deleted messages',
    args: {
        chatId: (0, shared_1.hashIdArg)(),
    },
    authorize: (_, { chatId }, { auth }) => chatId ? auth.canViewChat(chatId) : true,
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator('message.*', { pattern: true }), (payload, variables, context) => {
            if (variables.chatId) {
                return (payload.content.createdById !== context.userId &&
                    payload.content.chatId == variables.chatId);
            }
            return payload.recipients.includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve: (payload) => payload.content,
});
exports.MessageCreatedSubscription = (0, nexus_1.subscriptionField)('messageCreated', {
    type: 'InstantMessage',
    description: 'SUbscribe to created messages in chat',
    args: {
        chatId: (0, shared_1.hashIdArg)(),
    },
    authorize: (_, { chatId }, { auth }) => chatId ? auth.canViewChat(chatId) : true,
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.MessageCreated), (payload, variables, context) => {
            if (variables.chatId) {
                return (payload.content.createdById !== context.userId &&
                    payload.content.chatId == variables.chatId);
            }
            return payload.recipients.includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve: (payload) => payload.content,
});
exports.MessageDeletedSubscription = (0, nexus_1.subscriptionField)('messageDeleted', {
    type: 'DeletedMessage',
    description: 'Subscribe to deleted messages in chat',
    args: {
        chatId: (0, shared_1.hashIdArg)(),
    },
    authorize: (_, { chatId }, { auth }) => chatId ? auth.canViewChat(chatId) : true,
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.MessageDeleted), (payload, variables, context) => {
            if (variables.chatId) {
                return (payload.content.createdById !== context.userId &&
                    payload.content.chatId == variables.chatId);
            }
            return payload.recipients.includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve: (payload) => payload.content,
});
exports.MessageUpdatedSubscription = (0, nexus_1.subscriptionField)('messageUpdated', {
    type: 'Message',
    description: 'Subscribe to updated messages in chat',
    args: {
        chatId: (0, shared_1.hashIdArg)(),
    },
    authorize: (_, { chatId }, { auth }) => chatId ? auth.canViewChat(chatId) : true,
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.MessageUpdated), (payload, variables, context) => {
            if (variables.chatId) {
                return (payload.content.createdById !== context.userId &&
                    payload.content.chatId == variables.chatId);
            }
            return payload.recipients.includes(context.userId);
        })(rootValue, args, context);
    }),
    resolve: (payload) => payload.content,
});
//# sourceMappingURL=message.subscription.js.map