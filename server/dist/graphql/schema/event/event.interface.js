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
exports.EventInterface = void 0;
const nexus_1 = require("nexus");
exports.EventInterface = (0, nexus_1.interfaceType)({
    name: 'Event',
    description: 'A chat event',
    resolveType: (source, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        if (source.deletedAt) {
            return 'DeletedEvent';
        }
        if (source.type === 'MESSAGE') {
            return 'MessageEvent';
        }
        const update = yield prisma.chatUpdate.findUniqueOrThrow({
            where: {
                eventId: source.id,
            },
        });
        switch (update.type) {
            case 'ROLE_CHANGED':
                return 'RoleChangedEvent';
            case 'MEMBERS_ADDED':
                return 'MembersAddedEvent';
            case 'MEMBERS_REMOVED':
                return 'MembersRemovedEvent';
            case 'NAME_UPDATED':
                return 'NameUpdatedEvent';
            case 'DESCRIPTION_UPDATED':
                return 'DescriptionUpdatedEvent';
            default:
                return null;
        }
    }),
    definition: (t) => {
        t.nonNull.hashId('id', {
            description: 'Id of chat',
        });
        t.nonNull.hashId('createdById', {
            description: 'Id of user that created the chat',
        });
        t.nonNull.field('createdBy', {
            type: 'User',
            description: 'User that created the chat',
            resolve: (parent, __, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.user.findUniqueOrThrow({
                    where: {
                        id: parent.createdById || undefined,
                    },
                });
            }),
        });
        t.nonNull.boolean('isCreator', {
            description: 'Are you the creator of the chat?',
            resolve: (parent, _, { currentUserId }) => {
                return parent.createdById === currentUserId;
            },
        });
        t.nonNull.date('updatedAt', {
            description: 'Time of last update',
        });
        t.nonNull.date('createdAt', {
            description: 'Time of creation',
        });
        t.nonNull.hashId('chatId', {
            description: 'Id of chat associated with event',
        });
        t.nonNull.field('chat', {
            type: 'Chat',
            description: 'Chat associated with event',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.chat.findUniqueOrThrow({
                    where: {
                        id: parent.chatId || undefined,
                    },
                });
            }),
        });
    },
});
//# sourceMappingURL=event.interface.js.map