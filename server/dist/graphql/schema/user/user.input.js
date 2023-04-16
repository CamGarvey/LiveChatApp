"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrderBy = void 0;
const nexus_1 = require("nexus");
exports.UserOrderBy = (0, nexus_1.inputObjectType)({
    name: 'UserOrderBy',
    definition(t) {
        t.field('username', {
            type: 'Sort',
        });
        t.field('name', {
            type: 'Sort',
        });
        t.field('email', {
            type: 'Sort',
        });
        t.field('username', {
            type: 'Sort',
        });
        t.field('createdAt', {
            type: 'Sort',
        });
        t.field('updatedAt', {
            type: 'Sort',
        });
    },
});
//# sourceMappingURL=user.input.js.map