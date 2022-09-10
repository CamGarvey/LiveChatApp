import { objectType } from 'nexus';

export const NewFriendAlert = objectType({
  name: 'NewFriendAlert',
  definition: (t) => {
    t.implements('Alert');
  },
});
