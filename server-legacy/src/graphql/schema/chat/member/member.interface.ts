import { interfaceType } from 'nexus';

export const MemberInterface = interfaceType({
  name: 'Member',
  description: 'Member of chat',
  resolveType: (source: any) => {
    return source.deletedAt === null ? 'ChatMember' : 'DeletedMember';
  },
  definition: (t) => {
    t.nonNull.field('role', {
      type: 'Role',
      description: 'Role of member in chat',
    });
    t.nonNull.hashId('userId', {
      description: 'Id of user assiociated with member',
    });
    t.nonNull.field('user', {
      type: 'User',
      description: 'User associated with member',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.user.findFirstOrThrow({
          where: {
            id: parent.userId ?? undefined,
          },
        });
      },
    });
    t.nonNull.hashId('chatId', {
      description: 'Id of chat assiociated with member',
    });
    t.nonNull.field('chat', {
      type: 'Chat',
      description: 'Chat associated with member',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.chat.findFirstOrThrow({
          where: {
            id: parent.chatId ?? undefined,
          },
        });
      },
    });
    t.nonNull.hashId('addedById', {
      description: 'Id of user that added this member into the chat',
    });
    t.nonNull.field('addedBy', {
      type: 'User',
      description: 'User that added this member into the chat',
      resolve: async ({ chatId, userId }, _, { prisma }) => {
        return await prisma.member
          .findUniqueOrThrow({
            where: {
              userId_chatId: {
                chatId,
                userId,
              },
            },
          })
          .addedBy();
      },
    });
  },
});
