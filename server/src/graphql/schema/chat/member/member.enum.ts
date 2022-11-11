import { enumType } from 'nexus';

export const Role = enumType({
  name: 'Role',
  description: 'Role of member in the chat',
  members: ['BASIC', 'ADMIN', 'OWNER'],
});
