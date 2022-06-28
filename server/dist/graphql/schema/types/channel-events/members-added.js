"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersAdded = void 0;
const nexus_1 = require("nexus");
const members_modified_interface_1 = __importDefault(require("./members-modified.interface"));
exports.MembersAdded = (0, nexus_1.objectType)({
    name: 'MembersAdded',
    definition(t) {
        t.implements(members_modified_interface_1.default);
    },
});
//# sourceMappingURL=members-added.js.map