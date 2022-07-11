"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const nexus_1 = require("nexus");
exports.Message = (0, nexus_1.objectType)({
    name: 'Message',
    definition(t) {
        t.implements('IMessage');
        t.nonNull.string('content');
        t.nonNull.list.nonNull.field('likedBy', {
            type: 'UserResult',
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
//# sourceMappingURL=message.object.js.map