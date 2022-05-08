"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationResponse = void 0;
const nexus_1 = require("nexus");
exports.MutationResponse = (0, nexus_1.objectType)({
    name: 'MutationResponse',
    definition(t) {
        t.int('id');
        t.nonNull.boolean('success');
    },
});
//# sourceMappingURL=mutation-reponse.js.map