import { unionType } from 'nexus';

export const NotificationUnion = unionType({
  name: 'Notification',
  resolveType: (source: any) => {
    return 'chatId' in source ? 'ChatInvite' : 'FriendRequest';
  },
  definition: (t) => {
    t.members('FriendRequest', 'ChatInvite');
  },
});
