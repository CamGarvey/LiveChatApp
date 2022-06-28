import { enumType } from 'nexus';

export const FriendStatus = enumType({
  name: 'FriendStatus',
  members: ['FRIEND', 'REQUEST_SENT', 'REQUEST_RECEIVED', 'NOT_FRIEND'],
});
