"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedMessage = exports.Message = void 0;
const nexus_1 = require("nexus");
exports.Message = (0, nexus_1.objectType)({
    name: 'Message',
    definition(t) {
        t.implements('MessageInterface');
        t.nonNull.string('content');
        t.nonNull.list.nonNull.field('likedBy', {
            type: 'UserResult',
            resolve: (parent, _, { prisma }) => {
                return prisma.message
                    .findUnique({
                    where: { messageId: parent.messageId || undefined },
                })
                    .likedBy();
            },
        });
    },
});
exports.DeletedMessage = (0, nexus_1.objectType)({
    name: 'DeletedMessage',
    definition: (t) => {
        t.implements('MessageInterface');
    },
});
//# sourceMappingURL=message.object.js.map