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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChannel = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../../types/channel"));
exports.updateChannel = (0, nexus_1.mutationField)('updateChannel', {
    type: channel_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        name: (0, nexus_1.stringArg)(),
        isPrivate: (0, nexus_1.booleanArg)(),
    },
    description: 'Update a Channel',
    resolve: (_, { id, name, isPrivate }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = yield prisma.channel.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: id,
            },
        });
        if (channel == null) {
            throw new apollo_server_core_1.UserInputError(`Channel with id: ${id}, not found`);
        }
        if (channel.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to update this channel');
        }
        return prisma.channel.update({
            data: {
                name,
                isPrivate,
            },
            where: {
                id,
            },
        });
    }),
});
//# sourceMappingURL=updateChannel.mutation.js.map