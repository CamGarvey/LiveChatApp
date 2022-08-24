import { enumType } from 'nexus';

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
