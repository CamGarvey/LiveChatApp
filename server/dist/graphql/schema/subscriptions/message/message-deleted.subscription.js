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
exports.messageDeletedSubscription = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const backing_types_1 = require("src/graphql/backing-types");
exports.messageDeletedSubscription = (0, nexus_1.subscriptionField)('messageDeleted', {
    type: 'Message',
    args: {
        chatId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield context.prisma.chat
            .findUnique({
            where: {
                id: args.chatId,
            },
        })
            .members();
        if (!members.find((member) => member.id == context.userId)) {
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
//# sourceMappingURL=message-deleted.subscription.js.map