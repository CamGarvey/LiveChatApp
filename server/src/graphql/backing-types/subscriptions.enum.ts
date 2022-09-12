export enum Subscription {
  // Chat events
  EventCreated = 'event.created',
  EventUpdated = 'event.updated',
  EventDeleted = 'event.deleted',

  // Requests Notifications
  RequestSent = 'notification.request.sent',
  RequestCancelled = 'notification.request.cancelled',
  RequestAccepted = 'notification.request.accepted',
  RequestDeclined = 'notification.request.declined',

  // Alert Notifications
  FriendDeleted = 'notification.alert.friend.deleted',
  ChatCreated = 'notification.alert.chat.created',
  ChatDeleted = 'notification.alert.chat.deleted',
  ChatUpdated = 'notification.alert.chat.updated',
}
