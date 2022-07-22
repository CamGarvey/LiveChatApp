export enum Subscription {
  ChatUpdated = 'chat.updated',
  ChatCreated = 'chat.created',
  ChatDeleted = 'chat.deleted',
  ChatMembersDeleted = 'chat.members.deleted',
  ChatMembersAdded = 'chat.members.added',

  MessageCreated = 'message.created',
  MessageUpdated = 'message.updated',
  MessageDeleted = 'message.deleted',

  FriendCreated = 'notification.friend.created',
  FriendRequestCreated = 'notification.friendrequest.created',
  FriendRequestDeleted = 'notification.friendrequest.deleted',
}
