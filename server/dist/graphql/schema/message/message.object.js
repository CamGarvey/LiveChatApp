"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedMessage = exports.InstantMessage = void 0;
const nexus_1 = require("nexus");
exports.InstantMessage = (0, nexus_1.objectType)({
    name: 'InstantMessage',
    definition(t) {
        t.implements('Message');
        t.nonNull.string('content');
        t.nonNull.list.nonNull.field('likedBy', {
            type: 'User',
            resolve: (parent, _, { prisma }) => {
                return prisma.message
                    .findUniqueOrThrow({
                    where: { id: parent.id || undefined },
                })
                    .likedBy();
            },
        });
    },
});
exports.DeletedMessage = (0, nexus_1.objectType)({
    name: 'DeletedMessage',
    definition: (t) => {
        t.implements('Message');
        t.date('deletedAt');
    },
});
//# sourceMappingURL=message.object.js.map