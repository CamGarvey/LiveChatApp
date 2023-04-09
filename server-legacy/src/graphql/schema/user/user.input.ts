import { inputObjectType } from 'nexus';

export const UserOrderBy = inputObjectType({
  name: 'UserOrderBy',
  definition(t) {
    t.field('username', {
      type: 'Sort',
    });
    t.field('id', {
      type: 'Sort',
    });
    t.field('name', {
      type: 'Sort',
    });
    t.field('email', {
      type: 'Sort',
    });
    t.field('username', {
      type: 'Sort',
    });
    t.field('createdAt', {
      type: 'Sort',
    });
    t.field('updatedAt', {
      type: 'Sort',
    });
  },
});
