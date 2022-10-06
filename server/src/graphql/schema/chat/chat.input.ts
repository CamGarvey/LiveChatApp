import { inputObjectType } from 'nexus';

export const CreateGroupChatInput = inputObjectType({
  name: 'CreateGroupChatInput',
  definition: (t) => {
    t.nonNull.string('name', {
      description: 'Name of the chat',
    });
    t.string('description', {
      description: 'Short description of the group chat',
    });
    t.list.nonNull.hashId('memberIds', {
      description: 'Ids of the users to be added to group chat',
    });
  },
});
