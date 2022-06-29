import { objectType } from 'nexus';

export const MembersAdded = objectType({
  name: 'MembersAdded',
  definition(t) {
    t.implements('IMembersModified');
  },
});

// export default MembersAdded;
