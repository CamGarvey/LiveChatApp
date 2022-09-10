import { unionType } from 'nexus';

export const ChatSubscriptionResult = unionType({
  name: 'ChatSubscriptionResult',
  resolveType: (source: any) => source.type,
  definition: (t) => {
    t.members(
      'GroupChat',
      'DirectMessageChat',
      'NameUpdated',
      'DescriptionUpdated',
      'AdminsAdded',
      'AdminsRemoved',
      'MembersAdded',
      'MembersRemoved'
    );
  },
});
