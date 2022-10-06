import { enumType } from 'nexus';

export const AlertState = enumType({
  name: 'AlertState',
  members: ['UNSEEN', 'SEEN', 'ALL'],
});
