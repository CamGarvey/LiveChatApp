"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestState = void 0;
const nexus_1 = require("nexus");
exports.RequestState = (0, nexus_1.enumType)({
    name: 'RequestState',
    members: ['SENT', 'CANCELLED', 'ACCEPTED', 'DECLINED'],
});
//# sourceMappingURL=request.enum.js.map