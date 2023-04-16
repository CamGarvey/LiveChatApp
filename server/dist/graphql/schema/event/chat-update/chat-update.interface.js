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
exports.MemberAlterationEvent = exports.ChatUpdateEvent = void 0;
const nexus_1 = require("nexus");
exports.ChatUpdateEvent = (0, nexus_1.interfaceType)({
    name: 'ChatUpdateEvent',
    description: 'Event involving an update within chat',
    resolveType: (source, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
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
        t.implements('Event');
    },
});
exports.MemberAlterationEvent = (0, nexus_1.interfaceType)({
    name: 'MemberAlterationEvent',
    description: 'Event involving alterations of member/s in chat',
    resolveType: (source, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
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
            default:
                return null;
        }
    }),
    definition: (t) => {
        t.implements('ChatUpdateEvent');
        t.nonNull.list.nonNull.field('members', {
            type: 'Member',
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.chatUpdate
                    .findUniqueOrThrow({
                    where: {
                        eventId: parent.id,
                    },
                })
                    .members();
            }),
        });
    },
});
//# sourceMappingURL=chat-update.interface.js.map