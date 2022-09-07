import { interfaceType } from 'nexus';

export const Alert = interfaceType({
  name: 'Alert',
  resolveType: () => '',
  definition: (t) => {
    t.implements('Notification');
  },
});
