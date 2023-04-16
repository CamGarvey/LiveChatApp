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
exports.EventsQuery = exports.EventQuery = void 0;
const nexus_1 = require("nexus");
const shared_1 = require("../shared");
exports.EventQuery = (0, nexus_1.queryField)('event', {
    type: 'Event',
    description: 'Get a event by id',
    args: {
        eventId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of event',
        })),
    },
    authorize: (_, { eventId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canViewEvent(eventId); }),
    resolve: (_, { eventId }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.event.findFirstOrThrow({
            where: {
                id: eventId,
            },
        });
    }),
});
exports.EventsQuery = (0, nexus_1.queryField)((t) => {
    t.nonNull.connectionField('events', {
        type: 'Event',
        description: 'Get events based on chat id',
        additionalArgs: {
            chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
                description: 'Id of chat',
            })),
        },
        authorize: (_, { chatId }, { auth }) => __awaiter(void 0, void 0, void 0, function* () { return yield auth.canViewChat(chatId); }),
        totalCount: (_, args, { dataSources }) => dataSources.chat.getEventCount(args.chatId),
        resolve: (_, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return dataSources.chat.getEvents(args.chatId, args); }),
    });
});
//# sourceMappingURL=event.query.js.map