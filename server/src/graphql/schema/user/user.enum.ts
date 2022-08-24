import { enumType } from 'nexus';

export const StrangerStatus = enumType({
  name: 'StrangerStatus',
  members: ['REQUEST_SENT', 'REQUEST_RECEIVED', 'NO_REQUEST'],
});
