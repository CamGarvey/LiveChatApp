import { objectType } from 'nexus';

export const DeletedChat = objectType({
  name: 'DeletedChat',
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.field('createdBy', {
      type: 'User',
    });
    t.nonNull.list.field('members', {
      type: 'User',
    });
  },
});
