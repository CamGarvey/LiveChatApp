import { enumType } from 'nexus';

export const RequestStatus = enumType({
  name: 'RequestStatus',
  members: ['SENT', 'CANCELLED'],
});
