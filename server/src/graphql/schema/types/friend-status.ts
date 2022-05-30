import { enumType } from 'nexus';

const FriendStatus = enumType({
  name: 'FriendStatus',
  members: ['FRIEND', 'REQUEST_SENT', 'REQUEST_RECEIVED', 'NOT_FRIEND'],
});

export default FriendStatus;
