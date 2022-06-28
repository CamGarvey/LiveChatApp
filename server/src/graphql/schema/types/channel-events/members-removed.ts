import { objectType } from 'nexus';
import membersModified from './members-modified.interface';

export const MembersRemoved = objectType({
  name: 'MembersRemoved',
  definition(t) {
    t.implements(membersModified);
  },
});
