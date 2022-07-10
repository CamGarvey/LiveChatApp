import { objectType } from 'nexus';

export const Stranger = objectType({
  name: 'Stranger',
  definition: (t) => {
    t.implements('IUser');
  },
});
