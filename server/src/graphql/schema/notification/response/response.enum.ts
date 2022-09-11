import { enumType } from 'nexus';

export const ResponseStatus = enumType({
  name: 'ResponseStatus',
  members: ['SEEN', 'DECLINED', 'ACCEPTED'],
});
