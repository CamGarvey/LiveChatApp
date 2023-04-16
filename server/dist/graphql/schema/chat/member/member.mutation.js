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
exports.AddMembersMutation = exports.LeaveGroupChatMutation = exports.RemoveMembersMutation = exports.ChangeRole = void 0;
const graphql_1 = require("graphql");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
const shared_1 = require("../../shared");
exports.ChangeRole = (0, nexus_1.mutationField)('changeRole', {
    type: 'RoleChangedEvent',
    description: 'Change the role of a list of members',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of the chat',
        })),
        role: (0, nexus_1.nonNull)((0, nexus_1.arg)({
            type: 'Role',
            description: 'New role for members',
        })),
        members: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Ids of the affected members',
        })))),
    },
    authorize: (_, { chatId, members }, { auth }) => auth.canChangeMemberRoles({
        chatId,
        members,
    }),
    resolve: (_, { chatId, role, members }, { currentUserId, prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const memberIdSet = new Set(members);
        memberIdSet.delete(currentUserId);
        if (members.length === 0)
            throw new graphql_1.GraphQLError('Member list must not be empty');
        const chat = yield prisma.chat.update({
            data: {
                members: {
                    updateMany: {
                        data: {
                            role,
                        },
                        where: {
                            userId: {
                                in: [...memberIdSet],
                            },
                        },
                    },
                },
            },
            select: {
                members: {
                    select: {
                        userId: true,
                    },
                },
            },
            where: {
                id: chatId,
            },
        });
        const event = yield prisma.event.create({
            data: {
                type: 'CHAT_UPDATE',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                chatUpdate: {
                    create: {
                        type: 'ROLE_CHANGED',
                        newRole: role,
                        members: memberIdSet
                            ? {
                                connect: [...memberIdSet].map((userId) => ({
                                    userId_chatId: {
                                        chatId,
                                        userId,
                                    },
                                })),
                            }
                            : undefined,
                    },
                },
            },
        });
        const recipients = chat.members.map((x) => x.userId).filter((x) => x !== currentUserId);
        yield pubsub.publish(backing_types_1.Subscription.EventCreated, {
            recipients,
            content: event,
        });
        const alert = yield prisma.alert.create({
            data: {
                type: 'CHAT_ROLE_CHANGED',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                recipients: memberIdSet
                    ? {
                        connect: [...memberIdSet].map((id) => ({ id })),
                    }
                    : undefined,
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatAdminAccessRevokedAlert, {
            recipients,
            content: alert,
        });
        return event;
    }),
});
exports.RemoveMembersMutation = (0, nexus_1.mutationField)('removeMembers', {
    type: 'MembersRemovedEvent',
    description: 'Remove members from a group chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of the chat',
        })),
        members: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Ids of members to be removed from the chat',
        })))),
    },
    authorize: (_, { chatId, members }, { auth }) => auth.canRemoveMembersFromGroupChat({
        chatId,
        members,
    }),
    resolve: (_, { chatId, members }, { currentUserId, prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.update({
            data: {
                members: {
                    updateMany: {
                        data: {
                            removedAt: new Date().toISOString(),
                            removedById: currentUserId,
                        },
                        where: {
                            userId: {
                                in: members,
                            },
                        },
                    },
                },
            },
            include: {
                members: {
                    select: {
                        userId: true,
                    },
                },
            },
            where: {
                id: chatId,
            },
        });
        const event = yield prisma.event.create({
            data: {
                type: 'CHAT_UPDATE',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                chatUpdate: {
                    create: {
                        type: 'MEMBERS_REMOVED',
                        members: members
                            ? {
                                connect: members.map((userId) => ({
                                    userId_chatId: {
                                        chatId,
                                        userId,
                                    },
                                })),
                            }
                            : undefined,
                    },
                },
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.EventCreated, {
            recipients: chat.members.map((x) => x.userId).filter((x) => x !== currentUserId),
            content: event,
        });
        const alert = yield prisma.alert.create({
            data: {
                type: 'CHAT_ACCESS_REVOKED',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                recipients: members
                    ? {
                        connect: members.map((id) => ({ id })),
                    }
                    : undefined,
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatMemberAccessRevokedAlert, {
            recipients: members,
            content: alert,
        });
        return event;
    }),
});
exports.LeaveGroupChatMutation = (0, nexus_1.mutationField)('leaveGroupChat', {
    type: 'MembersRemovedEvent',
    description: 'Leave a group chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of the chat to leave',
        })),
    },
    authorize: (_, { chatId }, { auth, currentUserId }) => auth.canRemoveMembersFromGroupChat({
        chatId,
        members: [currentUserId],
    }),
    resolve: (_, { chatId }, { currentUserId, prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield prisma.chat.update({
            data: {
                members: {
                    update: {
                        data: {
                            removedAt: new Date().toISOString(),
                            removedById: currentUserId,
                        },
                        where: {
                            userId_chatId: {
                                chatId,
                                userId: currentUserId,
                            },
                        },
                    },
                },
            },
            include: {
                members: {
                    select: {
                        userId: true,
                    },
                },
            },
            where: {
                id: chatId,
            },
        });
        const event = yield prisma.event.create({
            data: {
                type: 'CHAT_UPDATE',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                chatUpdate: {
                    create: {
                        type: 'MEMBERS_REMOVED',
                        members: {
                            connect: {
                                userId_chatId: {
                                    chatId,
                                    userId: currentUserId,
                                },
                            },
                        },
                    },
                },
            },
        });
        const recipients = chat.members.map((x) => x.userId).filter((x) => x !== currentUserId);
        yield pubsub.publish(backing_types_1.Subscription.EventCreated, {
            recipients,
            content: event,
        });
        const alert = yield prisma.alert.create({
            data: {
                type: 'CHAT_ACCESS_REVOKED',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                recipients: {
                    connect: {
                        id: currentUserId,
                    },
                },
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatMemberAccessRevokedAlert, {
            recipients,
            content: alert,
        });
        return event;
    }),
});
exports.AddMembersMutation = (0, nexus_1.mutationField)('addMembers', {
    type: 'MembersAddedEvent',
    description: 'Add members to a group chat',
    args: {
        chatId: (0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Id of the chat',
        })),
        members: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, shared_1.hashIdArg)({
            description: 'Ids of members to be added into the chat',
        })))),
    },
    authorize: (_, { chatId, members }, { auth }) => auth.canAddMembersToGroupChat({
        chatId,
        members,
    }),
    resolve: (_, { chatId, members }, { currentUserId, prisma, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const memberIdSet = new Set(members);
        memberIdSet.delete(currentUserId);
        if (members.length === 0)
            throw new graphql_1.GraphQLError('Member list must not be empty');
        const chat = yield prisma.chat.update({
            data: {
                members: {
                    createMany: {
                        data: [...memberIdSet].map((id) => ({
                            userId: id,
                            role: 'BASIC',
                            addedById: currentUserId,
                        })),
                        skipDuplicates: true,
                    },
                    updateMany: {
                        data: {
                            removedAt: null,
                            removedById: null,
                            role: 'BASIC',
                        },
                        where: {
                            userId: {
                                in: [...memberIdSet],
                            },
                        },
                    },
                },
            },
            include: {
                members: {
                    select: {
                        id: true,
                    },
                },
            },
            where: {
                id: chatId,
            },
        });
        const event = yield prisma.event.create({
            data: {
                type: 'CHAT_UPDATE',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                chatUpdate: {
                    create: {
                        type: 'MEMBERS_ADDED',
                        members: members
                            ? {
                                connect: members.map((userId) => ({
                                    userId_chatId: {
                                        chatId,
                                        userId,
                                    },
                                })),
                            }
                            : undefined,
                    },
                },
            },
        });
        const recipients = chat.members.map((x) => x.id).filter((x) => x !== currentUserId);
        yield pubsub.publish(backing_types_1.Subscription.EventCreated, {
            recipients,
            content: event,
        });
        const alert = yield prisma.alert.create({
            data: {
                type: 'CHAT_ACCESS_GRANTED',
                chat: {
                    connect: {
                        id: chatId,
                    },
                },
                createdBy: {
                    connect: {
                        id: currentUserId,
                    },
                },
                recipients: members
                    ? {
                        connect: members.map((id) => ({ id })),
                    }
                    : undefined,
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatMemberAccessGrantedAlert, {
            recipients,
            content: alert,
        });
        return event;
    }),
});
//# sourceMappingURL=member.mutation.js.map