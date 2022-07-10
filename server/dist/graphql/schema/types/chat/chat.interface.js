"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IChat = void 0;
const nexus_1 = require("nexus");
exports.IChat = (0, nexus_1.interfaceType)({
    name: 'IChat',
    resolveType: (source) => (source.deletedAt == null ? 'Chat' : 'DeletedChat'),
    definition: (t) => {
        t.nonNull.id('id');
        t.nonNull.string('name');
        t.string('description');
        t.nonNull.id('createdById');
        t.field('createdBy', {
            type: 'User',
        });
        t.nonNull.boolean('isCreator', {
            resolve: (parent, _, { userId }) => {
                return parent.createdById == userId;
            },
        });
        t.field('deletedAt', {
            type: 'Date',
        });
        t.nonNull.field('updatedAt', {
            type: 'Date',
        });
        t.nonNull.boolean('isDM');
    },
});
//# sourceMappingURL=chat.interface.js.map