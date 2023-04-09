import { gql } from '@apollo/client';
import {
  UseDeleteChatFragment,
  useDeleteChatMutation,
} from 'graphql/generated/graphql';

gql`
  mutation DeleteChat($chatId: HashId!) {
    deletedChat(chatId: $chatId) {
      id
      deletedAt
    }
  }
  fragment UseDeleteChat on Chat {
    id
  }
`;

export const useDeleteChat = () => {
  const [deleteChatMutation, { loading }] = useDeleteChatMutation();

  const deleteChat = (chat: UseDeleteChatFragment) => {
    return deleteChatMutation({
      variables: {
        chatId: chat.id,
      },
      update: (cache) => {
        const normalizedId = cache.identify(chat);
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
  };

  return {
    deleteChat,
    loading,
  };
};
