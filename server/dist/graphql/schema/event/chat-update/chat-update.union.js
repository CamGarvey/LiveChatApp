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
exports.ChatUpdateResult = void 0;
const nexus_1 = require("nexus");
exports.ChatUpdateResult = (0, nexus_1.unionType)({
    name: 'ChatUpdate',
    resolveType: (source, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        const update = yield prisma.chatUpdate.findFirstOrThrow({
            where: {
                eventId: source.id,
            },
        });
        return update.type;
    }),
    definition: (t) => {
        t.members('NameUpdated', 'DescriptionUpdated', 'AdminsAdded', 'AdminsRemoved', 'MembersAdded', 'MembersRemoved');
    },
});
//# sourceMappingURL=chat-update.union.js.map