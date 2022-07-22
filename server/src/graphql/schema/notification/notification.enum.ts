import { enumType } from 'nexus';

export const NotificationTypeEnum = enumType({
  name: 'NotificationType',
  description: 'The types of notifications available',
  members: ['FRIEND_REQUEST'],
});
