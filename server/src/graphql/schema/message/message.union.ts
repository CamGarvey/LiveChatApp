import { unionType } from 'nexus';

export const MessageResult = unionType({
  name: 'MessageResult',
  resolveType: (source) =>
    source.deletedAt == null ? 'Message' : 'DeletedMessage',
  definition: (t) => {
    t.members('Message', 'DeletedMessage');
  },
});
