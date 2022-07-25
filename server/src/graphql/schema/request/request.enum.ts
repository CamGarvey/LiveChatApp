import { enumType } from 'nexus';

export const RequestStatusEnum = enumType({
  name: 'RequestStatus',
  members: ['PENDING', 'CANCELLED', 'DECLINED', 'ACCEPTED'],
});
