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
exports.createMessage = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("../types/message"));
const subscriptions_1 = require("../types/subscriptions");
exports.createMessage = (0, nexus_1.mutationField)('createMessage', {
    type: message_1.default,
    args: {
        channelId: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Create a Message in a Channel',
    resolve: (_, { channelId, content }, { prisma, pubsub, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const members = yield prisma.channel
            .findUnique({
            where: {
                id: channelId,
            },
        })
            .members();
        if (!members.find((member) => member.id == userId)) {
            throw new apollo_server_core_1.ForbiddenError('You are not a member of this channel');
        }
        const message = yield prisma.message.create({
            data: {
                channelId,
                createdById: userId,
                content,
            },
        });
        pubsub.publish(subscriptions_1.Subscriptions.NEW_MESSAGE, {
            channelId,
            message,
        });
        return message;
    }),
});
//# sourceMappingURL=createMessage.mutation.js.map