import { objectType } from 'nexus';

export const DeletedEvent = objectType({
  name: 'DeletedEvent',
  description: 'A deleted event',
  definition: (t) => {
    t.implements('Event');
    t.nonNull.date('deletedAt', {
      description: 'Time event was deleted',
    });
  },
});
