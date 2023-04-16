"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashIdArg = void 0;
const nexus_1 = require("nexus");
const hashIdArg = (opts = {}) => (0, nexus_1.arg)(Object.assign(Object.assign({}, opts), { type: 'HashId' }));
exports.hashIdArg = hashIdArg;
//# sourceMappingURL=hash-id.arg.js.map