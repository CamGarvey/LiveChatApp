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
exports.RequestsQuery = void 0;
const nexus_1 = require("nexus");
exports.RequestsQuery = (0, nexus_1.queryField)('requests', {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)('Request'))),
    args: {
        state: 'RequestState',
    },
    resolve: (_, { state }, { prisma, currentUserId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user
            .findUnique({
            where: {
                id: currentUserId,
            },
        })
            .requests({
            where: {
                state: state !== null && state !== void 0 ? state : undefined,
            },
        });
    }),
});
//# sourceMappingURL=request.query.js.map