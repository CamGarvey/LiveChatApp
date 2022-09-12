import { gql } from '@apollo/client';
import { useUser } from 'context/UserContext';
import { useUpdateGroupChatMutation } from 'graphql/generated/graphql';

gql`
  mutation UpdateGroupChat(
    $chatId: HashId!
    $name: String!
    $description: String!
    $addMembers: [HashId!]!
    $removeMembers: [HashId!]!
    $addAdmins: [HashId!]!
    $removeAdmins: [HashId!]!
  ) {
    updateGroupChatName(chatId: $chatId, name: $name) {
      nameBefore
      nameAfter
      chat {
        ... on GroupChat {
          id
          name
        }
      }
    }
    updateGroupChatDescription(chatId: $chatId, description: $description) {
      descriptionBefore
      descriptionAfter
      chat {
        ... on GroupChat {
          id
          description
        }
      }
    }
    addMembersToGroupChat(chatId: $chatId, members: $addMembers) {
      chat {
        ... on GroupChat {
          id
          members {
            id
          }
        }
      }
    }
    removeMembersFromGroupChat(chatId: $chatId, members: $removeMembers) {
      chat {
        ... on GroupChat {
          id
          members {
            id
          }
        }
      }
    }
    addAdminsToGroupChat(chatId: $chatId, members: $addAdmins) {
      chat {
        ... on GroupChat {
          id
          members {
            id
          }
        }
      }
    }
    removeAdminsFromGroupChat(chatId: $chatId, members: $removeAdmins) {
      chat {
        ... on GroupChat {
          id
          members {
            id
          }
        }
      }
    }
  }
`;

type MutateUserProps = {
  chatId: string;
  userIds: string[];
};

type UpdateChatData = {
  name?: string;
  description?: string;
  addMembers?: string[];
  removeMembers?: string[];
  addAdmins?: string[];
  removeAdmins?: string[];
};

type UpdateChatProps = {
  chatId: string;
  data: UpdateChatData;
};

export const useUpdateGroupChat = () => {
  const [update, { loading }] = useUpdateGroupChatMutation();

  const updateChat = ({
    chatId,
    data: {
      name,
      description,
      addAdmins = [],
      removeAdmins = [],
      addMembers = [],
      removeMembers = [],
    },
  }: UpdateChatProps) => {
    return update({
      variables: {
        chatId,
        name,
        description,
        addAdmins,
        removeAdmins,
        addMembers,
        removeMembers,
      },
    });
  };

  const updateName = ({ chatId, name }: { chatId: string; name: string }) => {
    return updateChat({
      chatId,
      data: {
        name,
      },
    });
  };

  const updateDescription = ({
    chatId,
    description,
  }: {
    chatId: string;
    description: string;
  }) => {
    return updateChat({
      chatId,
      data: {
        description,
      },
    });
  };

  const removeMembers = ({ chatId, userIds }: MutateUserProps) => {
    return updateChat({
      chatId,
      data: {
        removeMembers: userIds,
      },
    });
  };

  const addMembers = ({ chatId, userIds }: MutateUserProps) => {
    return updateChat({
      chatId,
      data: {
        addMembers: userIds,
      },
    });
  };

  const removeAdmins = ({ chatId, userIds }: MutateUserProps) => {
    return updateChat({
      chatId,
      data: {
        removeAdmins: userIds,
      },
    });
  };

  const addAdmins = ({ chatId, userIds }: MutateUserProps) => {
    return updateChat({
      chatId,
      data: {
        addAdmins: userIds,
      },
    });
  };

  return {
    updateChat,
    updateName,
    updateDescription,
    removeMembers,
    addMembers,
    removeAdmins,
    addAdmins,
    loading,
  };
};
