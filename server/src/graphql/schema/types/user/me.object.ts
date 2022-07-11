import { objectType } from 'nexus';

export const Me = objectType({
  name: 'Me',
  definition: (t) => {
    t.implements('IUser', 'IKnownUser');
  },
});
