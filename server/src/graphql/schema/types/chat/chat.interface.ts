import { interfaceType } from 'nexus';

export const IChat = interfaceType({
  name: 'IChat',
  resolveType: (source) => (source.deletedAt == null ? 'Chat' : 'DeletedChat'),
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.id('createdById');
    t.field('createdBy', {
      type: 'IUser',
    });
    t.nonNull.boolean('isCreator', {
      resolve: (parent, _, { userId }) => {
        return parent.createdById == userId;
      },
    });
    t.date('deletedAt');
    t.date('updatedAt');
    t.nonNull.boolean('isDM');
  },
});
