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
exports.createChat = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const backing_types_1 = require("../../../backing-types");
exports.createChat = (0, nexus_1.mutationField)('createChat', {
    type: 'Chat',
    args: {
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Name of the Chat',
        })),
        description: (0, nexus_1.stringArg)({
            description: 'Description of Chat',
        }),
        isPrivate: (0, nexus_1.booleanArg)({
            description: 'If the Chat should be private',
            default: true,
        }),
        memberIds: (0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'Ids of Users to be added to Chat',
        }))),
    },
    description: 'Create a Chat',
    resolve: (_, { name, description, isPrivate, memberIds }, { prisma, userId, pubsub }) => __awaiter(void 0, void 0, void 0, function* () {
        const memberIdSet = new Set(memberIds);
        if (memberIdSet.has(userId)) {
            memberIdSet.delete(userId);
        }
        if (memberIdSet) {
            const user = yield prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    friends: {
                        where: {
                            id: {
                                in: memberIds,
                            },
                        },
                    },
                },
            });
            if (!user) {
                throw new Error('Failed to find user');
            }
            if (user.friends.length != memberIdSet.size) {
                throw new apollo_server_core_1.ForbiddenError('You are not friends with all of the users provided');
            }
        }
        memberIdSet.add(userId);
        const chat = yield prisma.chat.create({
            data: {
                name,
                description,
                createdById: userId,
                isDM: false,
                isPrivate,
                members: {
                    connect: [...memberIdSet].map((id) => ({ id })),
                },
            },
        });
        yield pubsub.publish(backing_types_1.Subscription.ChatCreated, chat);
        yield pubsub.publish(backing_types_1.Subscription.UserChatCreated, chat);
        return chat;
    }),
});
//# sourceMappingURL=create-chat.mutation.js.map