import {
  useGetChatsQuery,
  ChatsSubscription,
  ChatsDocument,
  GetChatsQuery,
} from 'graphql/generated/graphql';
import { useEffect } from 'react';

export const useLiveChats = () => {
  const { data, subscribeToMore, loading } = useGetChatsQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore<ChatsSubscription>({
      document: ChatsDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const chat = subscriptionData.data;
        const newCache = Object.assign({}, prev, {
          chats: [...prev.chats, chat],
        } as GetChatsQuery);
        return newCache;
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  return {
    chats: data?.chats ?? [],
    loading,
  };
};
