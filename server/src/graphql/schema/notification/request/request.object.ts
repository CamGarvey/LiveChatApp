import { objectType } from 'nexus';

export const FriendRequest = objectType({
  name: 'FriendRequest',
  definition: (t) => {
    t.implements('Request', 'Notification');
  },
});
