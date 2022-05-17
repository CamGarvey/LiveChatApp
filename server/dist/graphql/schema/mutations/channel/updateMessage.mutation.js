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
exports.updateMessage = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_errors_1 = require("apollo-server-errors");
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("../types/message"));
exports.updateMessage = (0, nexus_1.mutationField)('updateMessage', {
    type: message_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
        content: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Update a Message',
    resolve: (_, { id, content }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (message.createdById != userId) {
            throw new apollo_server_core_1.ForbiddenError('You do not have permission to update this message');
        }
        return yield prisma.message.update({
            data: {
                content,
            },
            where: {
                id,
            },
        });
    }),
});
//# sourceMappingURL=updateMessage.mutation.js.map