import { gql } from '@apollo/client';
import { useUpdateGroupChatDescriptionMutation } from 'graphql/generated/graphql';
import useCache from './useCache';

gql`
  mutation UpdateGroupChatDescription($chatId: HashId!, $description: String!) {
    updateGroupChatDescription(chatId: $chatId, description: $description) {
      ...GroupChatUpdate
      descriptionBefore
      descriptionAfter
      event {
        chat {
          id
          ... on GroupChat {
            description
          }
        }
      }
    }
  }
  fragment GroupChatUpdate on ChatUpdate {
    eventId
    event {
      createdBy {
        id
      }
    }
  }
`;

export const useChatDescription = () => {
  const { addEvent } = useCache();
  const [updateMutation, { loading }] = useUpdateGroupChatDescriptionMutation();

  const update = (chatId: string, description: string) =>
    updateMutation({
      variables: {
        chatId,
        description,
      },
      update: addEvent(chatId),
    });

  return {
    update,
    updating: loading,
  };
};
