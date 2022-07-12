import { unionType } from 'nexus';

export const ChatResultUnion = unionType({
  name: 'ChatResult',
  resolveType: (source) => (source.deletedAt == null ? 'Chat' : 'DeletedChat'),
  definition: (t) => {
    t.members('Chat', 'DeletedChat');
  },
});
