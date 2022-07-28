import { enumType } from 'nexus';

export const FriendStatus = enumType({
  name: 'FriendStatus',
  members: ['FRIEND', 'REQUEST_SENT', 'REQUEST_RECEIVED', 'NOT_FRIEND'],
});

export const Sort = enumType({
  name: 'Sort',
  members: {
    asc: 'asc',
    desc: 'desc',
  },
});

export const RequestStatusEnum = enumType({
  name: 'RequestStatus',
  members: ['SENT', 'SEEN', 'CANCELLED', 'DECLINED', 'ACCEPTED'],
});
