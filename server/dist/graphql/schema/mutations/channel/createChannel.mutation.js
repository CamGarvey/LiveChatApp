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
exports.createChannel = void 0;
const nexus_1 = require("nexus");
const channel_1 = __importDefault(require("../types/channel"));
exports.createChannel = (0, nexus_1.mutationField)('createChannel', {
    type: channel_1.default,
    args: {
        name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        isPrivate: (0, nexus_1.nonNull)((0, nexus_1.booleanArg)()),
    },
    description: 'Create a Channel',
    resolve: (_, { name, isPrivate }, { prisma, userId }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.channel.create({
            data: {
                name,
                createdById: userId,
                isDM: false,
                isPrivate,
                members: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }),
});
//# sourceMappingURL=createChannel.mutation.js.map