"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stranger = exports.Me = exports.Friend = void 0;
const nexus_1 = require("nexus");
exports.Friend = (0, nexus_1.objectType)({
    name: 'Friend',
    definition: (t) => {
        t.implements('UserInterface', 'KnownUserInterface');
    },
});
exports.Me = (0, nexus_1.objectType)({
    name: 'Me',
    definition: (t) => {
        t.implements('UserInterface', 'KnownUserInterface');
    },
});
exports.Stranger = (0, nexus_1.objectType)({
    name: 'Stranger',
    definition: (t) => {
        t.implements('UserInterface');
    },
});
//# sourceMappingURL=user.object.js.map