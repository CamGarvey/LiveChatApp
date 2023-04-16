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
exports.UpdateMessageMutation = exports.CreateMessageMutation = void 0;
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
const message_input_1 = require("./message.input");
exports.CreateMessageMutation = (0, nexus_1.mutationField)('createMessage', {
    type: 'MessageEvent',
    description: 'Create a message in a chat',
    args: { data: (0, nexus_1.nonNull)(message_input_1.CreateMessageInput) },
    authorize: (_, { data }, { auth }) => auth.canCreateEvent(data.chatId),
    resolve: (_, { data }, { prisma, pubsub, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield prisma.event.create({
            data: {
                type: 'MESSAGE',
                chatId: data.chatId,
                createdById: currentUserId,
                message: {
                    create: {
                        content: data.content,
                    },
                },
            },
            include: {
                message: {
                    select: {
                        content: true,
                    },
                },
                chat: {
                    select: {
                        members: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        pubsub.publish(backing_types_1.Subscription.EventCreated, {
            recipients: event.chat.members.map((x) => x.id).filter((x) => x !== currentUserId),
            content: event,
        });
        return event;
    }),
});
exports.UpdateMessageMutation = (0, nexus_1.mutationField)('updateMessage', {
    type: 'MessageEvent',
    description: 'Update a message',
    args: {
        data: (0, nexus_1.nonNull)(message_input_1.UpdateMessageInput),
    },
    authorize: (_, { data }, { auth }) => auth.canUpdateEvent(data.messageId),
    resolve: (_, { data }, { prisma, pubsub, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.update({
            data: {
                content: data.content,
            },
            include: {
                event: {
                    include: {
                        chat: {
                            select: {
                                members: {
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                eventId: data.messageId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.EventUpdated, {
            recipients: message.event.chat.members.map((x) => x.id).filter((x) => x !== currentUserId),
            content: message.event,
        });
        return message.event;
    }),
});
//# sourceMappingURL=message.mutation.js.map