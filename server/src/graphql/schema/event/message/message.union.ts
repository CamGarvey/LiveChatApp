import { unionType } from 'nexus';

export const MessageResult = unionType({
  name: 'MessageResult',
  resolveType: (t: any) => {
    return t.deletedAt == null ? 'Message' : 'DeletedMessage';
  },
  definition: (t) => {
    t.members('Message', 'DeletedMessage');
  },
});
