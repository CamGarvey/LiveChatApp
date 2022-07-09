export enum Subscription {
  ChatUpdated = 'chat.updated',
  ChatCreated = 'chat.created',
  ChatDeleted = 'chat.deleted',
  ChatMembersDeleted = 'chat.members.deleted',
  ChatMembersAdded = 'chat.members.added',

  MessageCreated = 'message.created',
  MessageUpdated = 'message.updated',
  MessageDeleted = 'message.deleted',

  UserFriendRequestSent = 'user.friend.request.sent',
  UserFriendRequestReceived = 'user.friend.request.received',
  UserFriendRequestDeleted = 'user.friend.request.canceled',
  UserFriendCreated = 'user.friend.created',
  UserFriendDeleted = 'user.friend.deleted',
  UserChatCreated = 'user.chat.created',
}
