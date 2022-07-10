import { objectType } from 'nexus';

export const DeletedChat = objectType({
  name: 'DeletedChat',
  definition: (t) => {
    t.implements('IChat');
  },
});
