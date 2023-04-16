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
exports.DeletedChat = exports.GroupChat = exports.DirectMessageChat = void 0;
const nexus_1 = require("nexus");
exports.DirectMessageChat = (0, nexus_1.objectType)({
    name: 'DirectMessageChat',
    description: 'A direct message chat is a conversation between 2 members',
    definition: (t) => {
        t.implements('Chat');
        t.nonNull.field('friend', {
            type: 'User',
            description: 'Other user involved in direct message conversation',
            resolve: (parent, __, { currentUserId, prisma }) => __awaiter(void 0, void 0, void 0, function* () {
                return yield prisma.member
                    .findFirstOrThrow({
                    where: {
                        chatId: parent.id,
                        AND: [
                            {
                                chatId: parent.id,
                            },
                            {
                                userId: {
                                    not: currentUserId,
                                },
                            },
                        ],
                    },
                })
                    .user();
            }),
        });
        t.nonNull.connectionField('events', {
            type: 'Event',
            description: 'Events in chat',
            totalCount: () => 1,
            resolve: (parent, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.chat.getEvents(parent.id, args); }),
        });
    },
});
exports.GroupChat = (0, nexus_1.objectType)({
    name: 'GroupChat',
    description: `A group chat can have a name, a description and members can be given roles`,
    definition: (t) => {
        t.implements('Chat');
        t.nonNull.string('name', {
            description: 'Group chat name',
        });
        t.string('description', {
            description: 'Group chat description',
        });
        t.nonNull.int('memberCount', {
            description: 'Number of members in the chat',
            resolve: (parent, _, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.chat.getMemberCount(parent.id); }),
        });
        t.nonNull.field('role', {
            type: 'Role',
            description: 'Your role in the chat',
            resolve: ({ id }, _, { currentUserId, dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.chat.getMember(id, currentUserId).then((member) => member.role); }),
        });
        t.nonNull.connectionField('members', {
            type: 'Member',
            description: 'Members in chat',
            totalCount: () => 1,
            resolve: (parent, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.chat.getMembers(parent.id, args); }),
        });
        t.nonNull.connectionField('events', {
            type: 'Event',
            description: 'Events in chat',
            totalCount: () => 1,
            resolve: (parent, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.chat.getEvents(parent.id, args); }),
        });
    },
});
exports.DeletedChat = (0, nexus_1.objectType)({
    name: 'DeletedChat',
    description: 'A chat that has been deleted',
    definition: (t) => {
        t.implements('Chat');
        t.nonNull.date('deletedAt');
    },
});
//# sourceMappingURL=chat.object.js.map