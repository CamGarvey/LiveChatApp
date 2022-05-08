"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateScalar = void 0;
const graphql_1 = require("graphql");
const nexus_1 = require("nexus");
exports.DateScalar = (0, nexus_1.scalarType)({
    name: 'Date',
    asNexusMethod: 'date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value.getTime();
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    },
});
//# sourceMappingURL=scalars.js.map