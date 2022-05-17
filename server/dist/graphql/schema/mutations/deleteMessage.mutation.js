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
exports.deleteMessage = void 0;
const nexus_1 = require("nexus");
const apollo_server_errors_1 = require("apollo-server-errors");
const message_1 = __importDefault(require("../types/message"));
exports.deleteMessage = (0, nexus_1.mutationField)('deleteMessage', {
    type: message_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
    },
    description: 'Delete a Message',
    resolve: (_, { id }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        const message = yield prisma.message.findUnique({
            select: {
                createdById: true,
            },
            where: {
                id: id,
            },
        });
        if (message == null) {
            throw new apollo_server_errors_1.UserInputError(`Message with id: ${id}, not found`);
        }
        if (message.createdById) {
            throw new apollo_server_errors_1.ForbiddenError('You do not have permission to delete this message');
        }
        return prisma.message.update({
            data: {
                deletedAt: Date.now().toString(),
            },
            where: {
                id,
            },
        });
    }),
});
//# sourceMappingURL=deleteMessage.mutation.js.map