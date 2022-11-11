import { gql } from '@apollo/client';
import { useUpdateGroupChatNameMutation } from 'graphql/generated/graphql';
import useCache from './useCache';

gql`
  mutation UpdateGroupChatName($chatId: HashId!, $name: String!) {
    updateGroupChatName(chatId: $chatId, name: $name) {
      ...GroupChatUpdate
      nameBefore
      nameAfter
      chat {
        id
        ... on GroupChat {
          name
        }
      }
    }
  }
  fragment GroupChatUpdate on ChatUpdateEvent {
    id
    createdBy {
      id
    }
  }
`;

export const useChatName = () => {
  const { addEvent } = useCache();
  const [updateMutation, { loading }] = useUpdateGroupChatNameMutation();

  const update = (chatId: string, name: string) =>
    updateMutation({
      variables: {
        chatId,
        name,
      },
      update: addEvent(chatId),
    });

  return {
    update,
    updating: loading,
  };
};
