"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stranger = void 0;
const nexus_1 = require("nexus");
exports.Stranger = (0, nexus_1.objectType)({
    name: 'Stranger',
    definition: (t) => {
        t.implements('IUser');
    },
});
//# sourceMappingURL=stranger.object.js.map