export enum Subscription {
  ChatUpdated = 'chat.updated',
  ChatCreated = 'chat.created',
  ChatDeleted = 'chat.deleted',
  ChatMembersDeleted = 'chat.members.deleted',
  ChatMembersAdded = 'chat.members.added',

  MessageCreated = 'message.created',
  MessageUpdated = 'message.updated',
  MessageDeleted = 'message.deleted',

  FriendRequestCancelled = 'notification.friendrequest.cancelled',
  FriendRequestAccepted = 'notification.friendrequest.accepted',
  FriendRequestSent = 'notification.friendrequest.sent',
  FriendRequestDeclined = 'notification.friendrequest.declined',

  FriendDeleted = 'friend.deleted',
}
