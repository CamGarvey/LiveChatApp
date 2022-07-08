"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const scalars_1 = require("./scalars");
const Message = (0, nexus_1.objectType)({
    name: 'Message',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.string('content');
        t.nonNull.field('createdAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.string('createdById');
        t.nonNull.field('createdBy', {
            type: 'User',
            resolve: (parent, _, { prisma }) => {
                return prisma.user.findUnique({
                    where: {
                        id: parent.createdById,
                    },
                });
            },
        });
        t.nonNull.list.nonNull.field('likedBy', {
            type: 'User',
            resolve: (parent, _, { prisma }) => {
                return prisma.message
                    .findUnique({
                    where: { id: parent.id || undefined },
                })
                    .likedBy();
            },
        });
        t.nonNull.field('updatedAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.field('chat', {
            type: 'Chat',
            resolve: (parent, _, { prisma }) => {
                return prisma.chat.findUnique({
                    where: {
                        id: parent.id,
                    },
                });
            },
        });
        t.nonNull.id('chatId');
    },
});
exports.default = Message;
//# sourceMappingURL=message.js.map