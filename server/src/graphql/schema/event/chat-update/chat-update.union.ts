import { unionType } from 'nexus';

export const ChatUpdateResult = unionType({
  name: 'ChatUpdate',
  resolveType: async (source, { prisma }) => {
    const update = await prisma.chatUpdate.findFirstOrThrow({
      where: {
        eventId: source.id,
      },
    });
    return update.type;
  },
  definition: (t) => {
    t.members(
      'NameUpdated',
      'DescriptionUpdated',
      'AdminsAdded',
      'AdminsRemoved',
      'MembersAdded',
      'MembersRemoved'
    );
  },
});
