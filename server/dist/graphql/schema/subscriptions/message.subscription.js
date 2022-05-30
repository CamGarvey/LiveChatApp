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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessageSubscription = void 0;
const apollo_server_core_1 = require("apollo-server-core");
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
    subscribe: (rootValue, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield context.prisma.channel
            .findUnique({
            where: {
                id: args.channelId,
            },
        })
            .members();
        if (!members.find((member) => member.id == context.userId)) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to subscribe to this channel ');
        }
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(subscriptions_1.Subscriptions.NEW_MESSAGE), (payload, variables) => {
            return payload.channelId === variables.channelId;
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=message.subscription.js.map