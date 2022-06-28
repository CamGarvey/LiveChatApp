"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersRemoved = void 0;
const nexus_1 = require("nexus");
const members_modified_interface_1 = __importDefault(require("./members-modified.interface"));
exports.MembersRemoved = (0, nexus_1.objectType)({
    name: 'MembersRemoved',
    definition(t) {
        t.implements(members_modified_interface_1.default);
    },
});
//# sourceMappingURL=members-removed.js.map