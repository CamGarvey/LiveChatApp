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
exports.MessageQuery = void 0;
const nexus_1 = require("nexus");
const message_1 = __importDefault(require("../types/message"));
exports.MessageQuery = (0, nexus_1.queryField)('Message', {
    type: message_1.default,
    args: {
        id: (0, nexus_1.nonNull)((0, nexus_1.intArg)({
            description: 'id of message',
        })),
    },
    resolve: (_, { id }, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.message.findUnique({
            where: {
                id: id,
            },
        });
    }),
});
//# sourceMappingURL=message.query.js.map