export enum Subscription {
  // Chat events
  EventCreated = 'event.created',
  EventUpdated = 'event.updated',
  EventDeleted = 'event.deleted',

  // Requests Notifications
  RequestSent = 'notification.request.sent',
  RequestCancelled = 'notification.request.cancelled',

  // Alert Notifications
  RequestAccepted = 'notification.alert.request.accepted',
  RequestDeclined = 'notification.alert.request.declined',
  FriendDeleted = 'notification.alert.friend.deleted',
  ChatCreated = 'notification.alert.chat.created',
  ChatDeleted = 'notification.alert.chat.deleted',
  ChatUpdated = 'notification.alert.chat.updated',
}
