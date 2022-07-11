"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQuery = void 0;
const nexus_1 = require("nexus");
exports.userQuery = (0, nexus_1.queryField)('user', {
    type: 'UserResult',
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)({
            description: 'id of user',
        })),
    },
    resolve: (_, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        return yield ctx.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }),
});
//# sourceMappingURL=user.query.js.map