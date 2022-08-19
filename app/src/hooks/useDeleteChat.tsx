import { useDeleteChatMutation } from 'graphql/generated/graphql';

export const useDeleteChat = () => {
  const [deleteChatMutation, { loading }] = useDeleteChatMutation();

  const deleteChat = (chat: { __typename: string; id: string }) => {
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
