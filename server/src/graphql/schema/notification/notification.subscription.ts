import { Notification } from '@prisma/client';
import { withFilter } from 'graphql-subscriptions';
import { subscriptionField } from 'nexus';

type FriendRequestNotification = Notification & {
  recipients: {
    id: string;
  }[];
};

export const NotificationsSubscription = subscriptionField('notifications', {
  type: 'Notification',
  description: 'Subscribe to any notification',
  subscribe: withFilter(
    (_, __, { pubsub }) =>
      pubsub.asyncIterator('notification.*', { pattern: true }),
    (payload: FriendRequestNotification, _, context) => {
      return payload.recipients.map((x) => x.id).includes(context.userId);
    }
  ),
  resolve(payload: any) {
    return payload;
  },
});

export const FriendRequestNotificationsSubscription = subscriptionField(
  'friendRequestNotifications',
  {
    type: 'FriendRequestNotification',
    description: 'Subscribe to friend request notifications',
    subscribe: withFilter(
      (_, __, { pubsub }) =>
        pubsub.asyncIterator('notification.friendrequest.*', { pattern: true }),
      (payload: FriendRequestNotification, _, context) => {
        return payload.recipients.map((x) => x.id).includes(context.userId);
      }
    ),
    resolve(payload: any) {
      return payload;
    },
  }
);
