"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMe = void 0;
const nexus_1 = require("nexus");
exports.updateMe = (0, nexus_1.mutationField)('updateMe', {
    type: 'Me',
    args: {
        email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    description: 'Update current User',
    resolve(_, { email, username }, { userId, prisma }) {
        return prisma.user.update({
            data: {
                email,
                username,
            },
            where: {
                id: userId,
            },
        });
    },
});
//# sourceMappingURL=update-me.mutation.js.map