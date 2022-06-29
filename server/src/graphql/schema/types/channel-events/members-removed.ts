import { objectType } from 'nexus';

export const MembersRemoved = objectType({
  name: 'MembersRemoved',
  definition(t) {
    t.implements('IMembersModified');
  },
});
