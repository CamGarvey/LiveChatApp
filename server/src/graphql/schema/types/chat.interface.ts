import { interfaceType } from 'nexus';
import { DateScalar } from './scalars';

export const IChat = interfaceType({
  name: 'IChat',
  resolveType: (source) => (source.deletedAt == null ? 'Chat' : 'DeletedChat'),
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.string('description');
    t.nonNull.id('createdById');
    t.field('createdBy', {
      type: 'User',
    });
    t.nonNull.boolean('isCreator', {
      resolve: (parent, _, { userId }) => {
        return parent.createdById == userId;
      },
    });
    t.field('deletedAt', {
      type: DateScalar,
    });
    t.nonNull.field('updatedAt', {
      type: DateScalar,
    });
    t.nonNull.boolean('isDM');
  },
});
