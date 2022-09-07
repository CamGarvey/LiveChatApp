import { unionType } from 'nexus';

export const NotificationUnion = unionType({
  name: 'Notification',
  resolveType: () => 'FriendRequest',
  definition: (t) => {
    t.members('FriendRequest');
  },
});
