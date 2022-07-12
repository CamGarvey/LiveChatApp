"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatInterface = void 0;
const nexus_1 = require("nexus");
exports.ChatInterface = (0, nexus_1.interfaceType)({
    name: 'ChatInterface',
    resolveType: (source) => (source.deletedAt == null ? 'Chat' : 'DeletedChat'),
    definition: (t) => {
        t.nonNull.id('id');
        t.nonNull.string('name');
        t.string('description');
        t.nonNull.id('createdById');
        t.field('createdBy', {
            type: 'UserResult',
        });
        t.nonNull.boolean('isCreator', {
            resolve: (parent, _, { userId }) => {
                return parent.createdById == userId;
            },
        });
        t.date('deletedAt');
        t.date('updatedAt');
        t.nonNull.boolean('isDM');
    },
});
//# sourceMappingURL=chat.interface.js.map