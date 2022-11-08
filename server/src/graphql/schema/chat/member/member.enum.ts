import { enumType } from 'nexus';

export const Role = enumType({
  name: 'Role',
  members: ['BASIC', 'ADMIN', 'OWNER'],
});
