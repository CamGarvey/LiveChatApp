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
exports.MessageEvent = void 0;
const nexus_1 = require("nexus");
exports.MessageEvent = (0, nexus_1.objectType)({
    name: 'MessageEvent',
    description: 'Message event',
    definition(t) {
        t.implements('Event');
        t.nonNull.string('content', {
            description: 'Content of message',
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                const message = yield prisma.message.findUniqueOrThrow({
                    where: { eventId: parent.id || undefined },
                });
                return message.content;
            }),
        });
        t.nonNull.list.nonNull.field('likedBy', {
            type: 'User',
            description: 'Users that liked this message',
            resolve: (parent, _, { prisma }) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.message
                    .findUniqueOrThrow({
                    where: {
                        eventId: parent.id,
                    },
                })
                    .likedBy();
            }),
        });
    },
});
//# sourceMappingURL=message.object.js.map