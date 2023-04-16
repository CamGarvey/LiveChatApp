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
exports.ChatAccessAlertSubscription = exports.AlertSubscription = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
exports.AlertSubscription = (0, nexus_1.subscriptionField)('alerts', {
    type: 'Alert',
    description: 'Subscribe to alerts',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator('notification.alert.*', {
            pattern: true,
        }), (payload) => {
            return payload.recipients.includes(context.currentUserId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload.content;
    },
});
exports.ChatAccessAlertSubscription = (0, nexus_1.subscriptionField)('chatAccessAlerts', {
    type: 'ChatAccessAlert',
    description: 'Subscribe to alerts',
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator('notification.alert.chat.access.*', {
            pattern: true,
        }), (payload) => {
            return payload.recipients.includes(context.currentUserId);
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload.content;
    },
});
//# sourceMappingURL=alert.subscription.js.map