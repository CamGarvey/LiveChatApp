import { list, nonNull, queryField } from 'nexus';

export const ChatInvitesQuery = queryField('chatInvites', {
  type: nonNull(list(nonNull('ChatInvite'))),
  args: {
    status: 'RequestStatus',
  },
  resolve: async (_, { status }, { prisma, userId }) => {
    return await prisma.chatInvite.findMany({
      where: {
        recipientId: userId,
        status,
        deletedAt: null,
      },
    });
  },
});
