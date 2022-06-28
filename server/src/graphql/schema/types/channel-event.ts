import { unionType } from 'nexus';

export const ChannelEvent = unionType({
  name: 'ChannelEvent',
  description: 'Any event that can be rendered in the chat',
  definition(t) {
    t.members('Message', 'MembersAdded', 'MembersRemoved');
  },
  // resolveType: (item) => item,
});
