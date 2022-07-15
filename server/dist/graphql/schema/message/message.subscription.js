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
exports.MessageUpdatedSubscription = exports.MessageDeletedSubscription = exports.MessagesSubscription = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
exports.MessagesSubscription = (0, nexus_1.subscriptionField)('messages', {
    type: 'Message',
    description: 'Subscribe to any created/updated/deleted messages',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield context.prisma.chat
            .findUnique({
            where: {
                chatId: args.chatId,
            },
        })
            .members();
        if (!members.find((member) => member.userId == context.userId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to subscribe to events in this chat');
        }
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator('message.*', { pattern: true }), (payload, variables) => {
            return payload.chatId === variables.chatId;
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
exports.MessageDeletedSubscription = (0, nexus_1.subscriptionField)('messageDeleted', {
    type: 'Message',
    description: 'SUbscribe to deleted message in chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield context.prisma.chat
            .findUnique({
            where: {
                chatId: args.chatId,
            },
        })
            .members();
        if (!members.find((member) => member.userId == context.userId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to subscribe to events in this chat');
        }
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.MessageDeleted), (payload, variables) => {
            return payload.chatId === variables.chatId;
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
exports.MessageUpdatedSubscription = (0, nexus_1.subscriptionField)('messageUpdated', {
    type: 'MessageResult',
    description: 'Subscribe to updated messages in chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield context.prisma.chat
            .findUnique({
            where: {
                chatId: args.chatId,
            },
        })
            .members();
        if (!members.find((member) => member.userId == context.userId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to subscribe to events in this chat');
        }
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(backing_types_1.Subscription.MessageUpdated), (payload, variables) => {
            return payload.chatId === variables.chatId;
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=message.subscription.js.map