export enum Subscription {
  // Chat updates

  ChatCreated = 'chat.created',
  ChatDeleted = 'chat.deleted',
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
  GroupChatCreated = 'group.chat.alert.notification.created',
}
