"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("./channel"));
const scalars_1 = require("./scalars");
const user_1 = __importDefault(require("./user"));
const Message = (0, nexus_1.objectType)({
    name: 'Message',
    definition(t) {
        t.nonNull.string('id');
        t.nonNull.string('content');
        t.nonNull.field('createdAt', {
            type: scalars_1.DateScalar,
        });
        t.nonNull.string('createdById');
        t.nonNull.field('createdBy', {
            type: user_1.default,
            resolve: (parent, _, { prisma }) => {
                return prisma.user.findUnique({
                    where: {
                        id: parent.createdById,
                    },
                });
            },
        });
        t.nonNull.list.nonNull.field('likedBy', {
            type: user_1.default,
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
        t.nonNull.field('channel', {
            type: channel_1.default,
            resolve: (parent, _, { prisma }) => {
                return prisma.channel.findUnique({
                    where: {
                        id: parent.id,
                    },
                });
            },
        });
    },
});
exports.default = Message;
//# sourceMappingURL=message.js.map