import { unionType } from 'nexus';

export const FriendRequestNotificationUnion = unionType({
  name: 'FriendRequestNotification',
  resolveType: (source: any) =>
    source.deletedAt
      ? 'DeletedFriendRequestNotification'
      : 'OpenFriendRequestNotification',

  definition: (t) => {
    t.members(
      'OpenFriendRequestNotification',
      'DeletedFriendRequestNotification'
    );
  },
});
