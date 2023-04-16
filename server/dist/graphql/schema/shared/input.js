"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterGroupInput = void 0;
const nexus_1 = require("nexus");
exports.FilterGroupInput = (0, nexus_1.inputObjectType)({
    name: 'FilterGroupInput',
    definition(t) {
        t.string('filter');
    },
});
//# sourceMappingURL=input.js.map