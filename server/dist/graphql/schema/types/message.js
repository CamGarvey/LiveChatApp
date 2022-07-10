"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const Message = (0, nexus_1.objectType)({
    name: 'Message',
    definition(t) {
        t.implements('IMessage');
        t.nonNull.string('content');
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
    },
});
exports.default = Message;
//# sourceMappingURL=message.js.map