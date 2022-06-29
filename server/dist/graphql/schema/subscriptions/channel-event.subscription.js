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
exports.channelEventSubscription = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const nexus_1 = require("nexus");
const subscriptions_enum_1 = require("../../backing-types/subscriptions.enum");
const ChannelEventPayload = (0, nexus_1.objectType)({
    name: 'ChannelEventPayload',
    definition(t) {
        t.nonNull.string('channelId');
        t.nonNull.field('event', {
            type: 'ChannelEvent',
        });
    },
});
exports.channelEventSubscription = (0, nexus_1.subscriptionField)('channelEventSubscription', {
    type: ChannelEventPayload,
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
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
        return (0, graphql_subscriptions_1.withFilter)(() => context.pubsub.asyncIterator(subscriptions_enum_1.Subscriptions.CHANNEL_EVENT), (payload, variables) => {
            return payload.channelId === variables.channelId;
        })(rootValue, args, context);
    }),
    resolve(payload) {
        return payload;
    },
});
//# sourceMappingURL=channel-event.subscription.js.map