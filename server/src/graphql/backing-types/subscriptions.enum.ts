export enum Subscription {
  // Chat updates

  ChatNameUpdated = 'chat.update.name.updated',
  ChatDescriptionUpdated = 'chat.update.description.updated',
  ChatMembersAdded = 'chat.update.members.added',
  ChatMembersRemoved = 'chat.update.members.removed',
  ChatAdminsAdded = 'chat.update.admins.added',
  ChatAdminsRemoved = 'chat.update.admins.removed',

  // Chat events

  MessageCreated = 'message.event.created',
  MessageUpdated = 'message.event.updated',
  MessageDeleted = 'message.event.deleted',

  // Notifications

  FriendRequestCancelled = 'friend.request.notification.cancelled',
  FriendRequestAccepted = 'friend.request.notification.accepted',
  FriendRequestSent = 'friend.request.notification.sent',
  FriendRequestDeclined = 'friend.request.notification.declined',
  FriendDeleted = 'friend.alert.notification.deleted',
  ChatCreated = 'chat.alert.notification.created',
  ChatDeleted = 'chat.alert.notification.deleted',
}
