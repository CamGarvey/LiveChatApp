import { objectType } from 'nexus';

export const DeletedEvent = objectType({
  name: 'DeletedEvent',
  definition: (t) => {
    t.implements('Event');
    t.nonNull.date('deletedAt');
  },
});
