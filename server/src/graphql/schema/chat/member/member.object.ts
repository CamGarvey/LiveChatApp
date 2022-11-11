import { objectType } from 'nexus';

export const ChatMember = objectType({
  name: 'ChatMember',
  description: 'A chat member',
  definition: (t) => {
    t.implements('Member');
  },
});

export const DeletedMember = objectType({
  name: 'DeletedMember',
  description: 'A member that as been deleted',
  definition: (t) => {
    t.implements('Member');
    t.nonNull.hashId('deletedById', {
      description: 'Id of user that deleted this member from the chat',
    });
    t.nonNull.field('deletedBy', {
      type: 'User',
      description: 'User that deleted this member from the chat',
      resolve: async (parent, _, { prisma }) => {
        return await prisma.member
          .findUniqueOrThrow({
            where: {
              userId_chatId: {
                chatId: parent.chatId,
                userId: parent.userId,
              },
            },
          })
          .deletedBy();
      },
    });
  },
});
