import { objectType } from 'nexus';

export const Response = objectType({
  name: 'Response',
  definition: (t) => {
    t.nonNull.field('status', {
      type: 'ResponseStatus',
    });
  },
});
