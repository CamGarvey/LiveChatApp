import { gql } from '@apollo/client';
import {
  UpdateGroupChatInput,
  useUpdateGroupChatMutation,
} from 'graphql/generated/graphql';

gql`
  mutation UpdateGroupChat(
    $chatId: HashId!
    $data: UpdateGroupChatInput!
    $addAdmins: [HashId!]!
    $removeAdmins: [HashId!]!
    $addMembers: [HashId!]!
    $removeMembers: [HashId!]!
  ) {
    updateGroupChat(chatId: $chatId, data: $data) {
      id
      name
      description
    }
    addAdminsToGroupChat(chatId: $chatId, members: $addAdmins) {
      id
      admins {
        id
      }
    }
    removeAdminsFromGroupChat(chatId: $chatId, members: $removeAdmins) {
      id
      admins {
        id
      }
    }
    addMembersToGroupChat(chatId: $chatId, members: $addMembers) {
      id
      members {
        id
      }
    }
    removeMembersFromGroupChat(chatId: $chatId, members: $removeMembers) {
      id
      members {
        id
      }
    }
  }

  fragment UpdateChat on GroupChat {
    id
    name
    description
    admins {
      id
    }
    members {
      id
    }
  }
`;

type MutateUserProps = {
  chatId: string;
  userIds: string[];
};

type UpdateChatData = UpdateGroupChatInput & {
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
        data: {
          name: name,
          description: description,
        },
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
