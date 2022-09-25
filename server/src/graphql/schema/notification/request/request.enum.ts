import { enumType } from 'nexus';

export const RequestState = enumType({
  name: 'RequestState',
  members: ['SENT', 'SEEN', 'CANCELLED', 'ACCEPTED', 'DECLINED'],
});
