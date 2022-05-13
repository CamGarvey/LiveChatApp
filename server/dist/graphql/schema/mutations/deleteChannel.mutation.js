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
exports.deleteChannel = void 0;
const nexus_1 = require("nexus");
exports.deleteChannel = (0, nexus_1.mutationField)('deleteChannel', {
    type: 'Boolean',
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete a Channel',
    resolve: (_, { id }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.channel.delete({
                where: {
                    id,
                },
            });
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }),
});
//# sourceMappingURL=deleteChannel.mutation.js.map