import { unionType } from 'nexus';

export const ChatSubscriptionResult = unionType({
  name: 'ChatSubscriptionResult',
  resolveType: (source) => 'Chat',
  definition: (t) => {
    t.members('GroupChat', 'DirectMessageChat');
  },
});
