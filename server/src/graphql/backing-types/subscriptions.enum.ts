export enum Subscription {
  ChatUpdated = 'chat.updated',
  ChatCreated = 'chat.created',
  ChatDeleted = 'chat.deleted',
  ChatMembersDeleted = 'chat.members.deleted',
  ChatMembersAdded = 'chat.members.added',

  MessageCreated = 'message.created',
  MessageUpdated = 'message.updated',
  MessageDeleted = 'message.deleted',

  FriendRequestCancelled = 'friendrequest.cancelled',
  FriendRequestAccepted = 'friendrequest.accepted',
  FriendRequestSent = 'friendrequest.sent',
  FriendRequestDeclined = 'friendrequest.declined',

  FriendDeleted = 'friend.deleted',
}
