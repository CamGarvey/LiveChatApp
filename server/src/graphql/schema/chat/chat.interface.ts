import { interfaceType } from 'nexus';

export const ChatInterface = interfaceType({
  name: 'Chat',
  resolveType: (chat: any) => {
    if (chat.deletedAt !== null) return 'DeletedChat';
    return chat.isDM ? 'DirectMessageChat' : 'GroupChat';
  },
  definition: (t) => {
    t.nonNull.hashId('id');
    t.nonNull.hashId('createdById');
    t.field('createdBy', {
      type: 'User',
    });
    t.nonNull.boolean('isCreator', {
      resolve: (parent, _, { userId }) => {
        return parent.createdById == userId;
      },
    });
    t.date('createdAt');
    t.date('updatedAt');
  },
});
