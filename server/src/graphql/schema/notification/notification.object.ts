import { objectType } from 'nexus';

export const OpenFriendRequestNotification = objectType({
  name: 'OpenFriendRequestNotification',
  definition: (t) => {
    t.implements('Notification');
  },
});

export const DeletedFriendRequestNotification = objectType({
  name: 'DeletedFriendRequestNotification',
  definition: (t) => {
    t.implements('Notification');
    t.nonNull.date('deletedAt');
  },
});

export const FriendNotification = objectType({
  name: 'FriendNotification',
  definition: (t) => {
    t.implements('Notification');
  },
});
