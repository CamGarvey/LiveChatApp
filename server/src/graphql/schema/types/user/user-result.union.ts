import { unionType } from 'nexus';

export const UserResult = unionType({
  name: 'UserResult',
  resolveType: (t) => 'IUser',
  definition: (t) => {
    t.members('Friend', 'Stranger');
  },
});
