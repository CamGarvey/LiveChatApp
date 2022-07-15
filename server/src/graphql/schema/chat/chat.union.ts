import { unionType } from 'nexus';

export const ChatResultUnion = unionType({
  name: 'ChatResult',
  resolveType: (chat: any) => {
    if (chat.deletedAt !== null) return 'DeletedChat';
    return chat.isDM ? 'DirectMessageChat' : 'GroupChat';
  },
  definition: (t) => {
    t.members('DirectMessageChat', 'GroupChat', 'DeletedChat');
  },
});
