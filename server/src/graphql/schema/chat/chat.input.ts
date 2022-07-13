import { inputObjectType } from 'nexus';

export const CreateChatInput = inputObjectType({
  name: 'CreateChatInput',
  definition: (t) => {
    t.nonNull.string('name', {
      description: 'Name of the chat',
    });
    t.string('description', {
      description: 'Short description of the chat',
    });
    t.boolean('isPrivate', {
      description: 'If the chat should be private',
      default: true,
    });
    t.list.nonNull.id('memberIds', {
      description: 'Ids of the users to be added to chat',
    });
  },
});

export const UpdateChatInput = inputObjectType({
  name: 'UpdateChatInput',
  definition: (t) => {
    t.nonNull.id('chatId', {
      description: 'Id of chat to update',
    });
    t.string('name', {
      description: 'New name for chat',
    });
    t.string('description', {
      description: 'New description for chat',
    });
    t.boolean('isPrivate', {
      description: 'Change if the chat is private',
    });
    t.list.nonNull.id('addMemberIds', {
      description: 'Ids of users to be add into the chat',
    });
    t.list.nonNull.id('removeMemberIds', {
      description: 'Ids of users to be removed from chat',
    });
  },
});
