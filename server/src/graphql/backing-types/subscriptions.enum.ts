export enum Subscription {
  // Chat updates
  ChatNameUpdated = 'updated.name.chat.update',
  ChatDescriptionUpdated = 'updated.description.chat.update',
  ChatMembersAdded = 'added.members.chat.update',
  ChatMembersRemoved = 'removed.members.chat.update',
  ChatAdminsAdded = 'added.admins.chat.update',
  ChatAdminsRemoved = 'removed.admins.chat.update',

  // Chat events
  MessageCreated = 'created.message.event',
  MessageUpdated = 'updated.message.event',
  MessageDeleted = 'deleted.message.event',

  // Notifications
  FriendRequestSent = 'sent.friend.request.notification',
  FriendRequestCancelled = 'cancelled.friend.request.notification',
  FriendRequestAccepted = 'accepted.friend.request.notification',
  FriendRequestDeclined = 'declined.friend.request.notification',
  FriendDeleted = 'deleted.friend.alert.notification',
  ChatCreated = 'created.chat.alert.notification',
  ChatDeleted = 'deleted.chat.alert.notification',
}
