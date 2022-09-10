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
  members: ['SEEN', 'DECLINED', 'ACCEPTED'],
});
