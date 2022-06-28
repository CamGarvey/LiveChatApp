import { objectType } from 'nexus';
import membersModified from './members-modified.interface';

export const MembersAdded = objectType({
  name: 'MembersAdded',
  definition(t) {
    t.implements(membersModified);
  },
});

// export default MembersAdded;
