import { gql } from '@apollo/client';
import {
  UpdateGroupChatInput,
  useUpdateGroupChatMutation,
} from 'graphql/generated/graphql';

gql`
  mutation UpdateGroupChat($data: UpdateGroupChatInput!) {
    updateGroupChat(data: $data) {
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
  }
`;

export const useUpdateGroupChat = () => {
  const [update, { loading }] = useUpdateGroupChatMutation();

  const updateChat = (updateGroupChatInput: UpdateGroupChatInput) => {
    return update({
      variables: {
        data: updateGroupChatInput,
      },
    });
  };

  return {
    updateChat,
    loading,
  };
};
