import { unionType } from 'nexus';

export const UserResult = unionType({
  name: 'UserResult',
  resolveType: (t) => 'Friend',
  definition: (t) => {
    t.members('Stranger', 'User');
  },
});
