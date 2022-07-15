import { interfaceType } from 'nexus';

export const ChatInterface = interfaceType({
  name: 'ChatInterface',
  resolveType: (chat: any) => {
    if (chat.deletedAt !== null) return 'DeletedChat';
    return chat.isDM ? 'DirectMessageChat' : 'GroupChat';
  },
  definition: (t) => {
    t.nonNull.id('chatId');
    t.nonNull.id('createdById');
    t.field('createdBy', {
      type: 'UserResult',
    });
    t.nonNull.boolean('isCreator', {
      resolve: (parent, _, { userId }) => {
        return parent.createdById == userId;
      },
    });
    t.date('updatedAt');
  },
});
