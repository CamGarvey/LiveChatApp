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
exports.RoleChangedEvent = exports.MembersRemovedEvent = exports.MembersAddedEvent = exports.DescriptionUpdatedEvent = exports.NameUpdatedEvent = void 0;
const nexus_1 = require("nexus");
exports.NameUpdatedEvent = (0, nexus_1.objectType)({
    name: 'NameUpdatedEvent',
    description: 'Chat name updated event',
    definition: (t) => {
        t.implements('ChatUpdateEvent');
        t.nonNull.string('nameBefore', {
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                const update = yield prisma.chatUpdate.findUniqueOrThrow({
                    where: {
                        eventId: parent.id,
                    },
                });
                return update.nameBefore;
            }),
        });
        t.nonNull.string('nameAfter', {
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                const update = yield prisma.chatUpdate.findUniqueOrThrow({
                    where: {
                        eventId: parent.id,
                    },
                });
                return update.nameAfter;
            }),
        });
    },
});
exports.DescriptionUpdatedEvent = (0, nexus_1.objectType)({
    name: 'DescriptionUpdatedEvent',
    description: 'Chat description updated event',
    definition: (t) => {
        t.implements('ChatUpdateEvent');
        t.nonNull.string('descriptionBefore', {
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                const update = yield prisma.chatUpdate.findUniqueOrThrow({
                    where: {
                        eventId: parent.id,
                    },
                });
                return update.descriptionBefore;
            }),
        });
        t.nonNull.string('descriptionAfter', {
            resolve: (parent, _, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                const update = yield prisma.chatUpdate.findUniqueOrThrow({
                    where: {
                        eventId: parent.id,
                    },
                });
                return update.descriptionAfter;
            }),
        });
    },
});
exports.MembersAddedEvent = (0, nexus_1.objectType)({
    name: 'MembersAddedEvent',
    description: 'Members added to chat event',
    definition: (t) => {
        t.implements('MemberAlterationEvent');
    },
});
exports.MembersRemovedEvent = (0, nexus_1.objectType)({
    name: 'MembersRemovedEvent',
    description: 'Members removed from chat event',
    definition: (t) => {
        t.implements('MemberAlterationEvent');
    },
});
exports.RoleChangedEvent = (0, nexus_1.objectType)({
    name: 'RoleChangedEvent',
    description: 'Roles of members updated event',
    definition: (t) => {
        t.implements('MemberAlterationEvent');
        t.nonNull.field('newRole', {
            type: 'Role',
        });
    },
});
//# sourceMappingURL=chat-update.object.js.map