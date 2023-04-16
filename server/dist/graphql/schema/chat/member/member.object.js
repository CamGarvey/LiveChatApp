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
exports.DeletedMember = exports.ChatMember = void 0;
const nexus_1 = require("nexus");
exports.ChatMember = (0, nexus_1.objectType)({
    name: 'ChatMember',
    description: 'A chat member',
    definition: (t) => {
        t.implements('Member');
    },
});
exports.DeletedMember = (0, nexus_1.objectType)({
    name: 'DeletedMember',
    description: 'A member that as been deleted',
    definition: (t) => {
        t.implements('Member');
        t.nonNull.hashId('removedById', {
            description: 'Id of user that deleted this member from the chat',
        });
        t.nonNull.field('removedBy', {
            type: 'User',
            description: 'User that deleted this member from the chat',
            resolve: (parent, _, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return dataSources.user.getUser(parent.removedById); }),
        });
    },
});
//# sourceMappingURL=member.object.js.map