"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedEvent = void 0;
const nexus_1 = require("nexus");
exports.DeletedEvent = (0, nexus_1.objectType)({
    name: 'DeletedEvent',
    description: 'A deleted event',
    definition: (t) => {
        t.implements('Event');
        t.nonNull.date('deletedAt', {
            description: 'Time event was deleted',
        });
    },
});
//# sourceMappingURL=event.object.js.map