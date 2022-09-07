import { objectType } from 'nexus';

export const NewChat = objectType({
  name: 'NewChat',
  description: 'New Chat Alert',
  definition: (t) => {
    t.implements('Alert');
  },
});
