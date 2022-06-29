import { interfaceType } from 'nexus';

export const IMembersModified = interfaceType({
  name: 'IMembersModified',
  definition(t) {
    t.nonNull.id('byUserId');
    t.nonNull.list.nonNull.id('memberIds');
  },
});
