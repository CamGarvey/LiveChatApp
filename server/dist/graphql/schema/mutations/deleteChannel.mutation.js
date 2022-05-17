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
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
exports.deleteChannel = (0, nexus_1.mutationField)('deleteChannel', {
    type: 'Boolean',
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete a Channel',
    resolve: (_, { id }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = yield prisma.channel.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: id,
            },
        });
        if (channel == null) {
            throw new apollo_server_core_1.ApolloError('Channel does not exist');
        }
        if (channel.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to delete this channel');
        }
        yield prisma.channel.delete({
            where: {
                id,
            },
        });
        return true;
    }),
});
//# sourceMappingURL=deleteChannel.mutation.js.map