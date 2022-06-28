import { interfaceType } from 'nexus';

const MembersModified = interfaceType({
  name: 'MembersModified',
  definition(t) {
    t.nonNull.id('byUserId');
    t.nonNull.list.nonNull.id('memberIds');
  },
});

export default MembersModified;
