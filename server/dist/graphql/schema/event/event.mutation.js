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
exports.DeleteEventMutation = void 0;
const nexus_1 = require("nexus");
const backing_types_1 = require("../../backing-types");
const shared_1 = require("../shared");
exports.DeleteEventMutation = (0, nexus_1.mutationField)('deleteEvent', {
    type: 'DeletedEvent',
    description: 'A deleted event',
    args: {
        eventId: (0, shared_1.hashIdArg)({
            description: 'Id of event',
        }),
    },
    authorize: (_, { eventId }, { auth }) => auth.canDeletedEvent(eventId),
    resolve: (_, { eventId }, { prisma, pubsub, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        const event = yield prisma.event.update({
            data: {
                deletedAt: new Date(),
            },
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
            where: {
                id: eventId,
            },
        });
        pubsub.publish(backing_types_1.Subscription.EventDeleted, {
            recipients: event.chat.members.map((x) => x.id).filter((x) => x !== currentUserId),
            content: event,
        });
        return event;
    }),
});
//# sourceMappingURL=event.mutation.js.map