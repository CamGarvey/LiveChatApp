export enum Subscription {
  ChatInfoUpdated = 'chat.info.updated',
  ChatCreated = 'chat.created',
  ChatDeleted = 'chat.deleted',
  ChatMembersDeleted = 'chat.members.deleted',
  ChatMembersAdded = 'chat.members.added',
  ChatAdminsDeleted = 'chat.admins.deleted',
  ChatAdminsAdded = 'chat.admins.added',

  MessageCreated = 'message.created',
  MessageUpdated = 'message.updated',
  MessageDeleted = 'message.deleted',

  FriendRequestCancelled = 'notification.request.friend.cancelled',
  FriendRequestAccepted = 'notification.request.friend.accepted',
  FriendRequestSent = 'notification.request.friend.sent',
  FriendRequestDeclined = 'notification.request.friend.declined',

  FriendDeleted = 'notification.alert.friend.deleted',
  FriendCreated = 'notification.alert.friend.created',
}
