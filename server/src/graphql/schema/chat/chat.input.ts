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

export const UpdateGroupChatInput = inputObjectType({
  name: 'UpdateGroupChatInput',
  definition: (t) => {
    t.nonNull.hashId('chatId', {
      description: 'Id of chat to update',
    });
    t.string('name', {
      description: 'New name for chat',
    });
    t.string('description', {
      description: 'New description for chat',
    });
    t.list.nonNull.hashId('addMemberIds', {
      description: 'Ids of users to be add into the chat',
    });
    t.list.nonNull.hashId('removeMemberIds', {
      description: 'Ids of users to be removed from chat',
    });
  },
});
