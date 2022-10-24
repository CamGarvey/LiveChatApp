import { enumType } from 'nexus';

export const RequestState = enumType({
  name: 'RequestState',
  members: ['SENT', 'CANCELLED', 'ACCEPTED', 'DECLINED'],
});
