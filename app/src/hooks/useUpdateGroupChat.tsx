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

type RemoveMemberProps = {
  chatId: string;
  userId: string;
};

export const useUpdateGroupChat = () => {
  const [update, { loading }] = useUpdateGroupChatMutation();

  const updateChat = (updateGroupChatInput: UpdateGroupChatInput) => {
    return update({
      variables: {
        data: updateGroupChatInput,
      },
    });
  };

  const removeMember = ({ userId, chatId }: RemoveMemberProps) => {
    return update({
      variables: {
        data: {
          chatId,
          removeMemberIds: [userId],
        },
      },
    });
  };

  return {
    updateChat,
    removeMember,
    loading,
  };
};
