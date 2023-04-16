"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashIdScalar = void 0;
const nexus_1 = require("nexus");
const graphql_1 = require("graphql");
const hashids_1 = __importDefault(require("hashids"));
const hash = new hashids_1.default(process.env.HASH_SALT, parseInt(process.env.HASH_MIN_LENGTH));
exports.HashIdScalar = (0, nexus_1.scalarType)({
    name: 'HashId',
    asNexusMethod: 'hashId',
    parseValue(value) {
        const [id] = hash.decode(value);
        return id;
    },
    serialize(value) {
        return hash.encode(value);
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            const [id] = hash.decode(ast.value);
            return id;
        }
        return null;
    },
});
//# sourceMappingURL=hash-id.scalar.js.map