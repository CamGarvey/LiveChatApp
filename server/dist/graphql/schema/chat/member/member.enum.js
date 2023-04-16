"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const nexus_1 = require("nexus");
exports.Role = (0, nexus_1.enumType)({
    name: 'Role',
    description: 'Role of member in the chat',
    members: ['BASIC', 'ADMIN', 'OWNER'],
});
//# sourceMappingURL=member.enum.js.map