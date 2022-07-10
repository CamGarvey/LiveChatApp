import { objectType } from 'nexus';

export const DeletedMessage = objectType({
  name: 'DeletedMessage',
  definition: (t) => {
    t.implements('IMessage');
  },
});
