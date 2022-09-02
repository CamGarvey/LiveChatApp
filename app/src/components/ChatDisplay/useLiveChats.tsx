import { useEffect } from 'react';
import ChatItem from './ChatItem';
import { gql } from '@apollo/client';
import {
  ChatsForDisplayChangedDocument,
  ChatsForDisplayChangedSubscription,
  GetChatsForDisplayQuery,
  useGetChatsForDisplayQuery,
} from 'graphql/generated/graphql';

gql`
  query GetChatsForDisplay {
    chats {
      ...ChatsForDisplay
    }
  }
  subscription ChatsForDisplayChanged {
    chats {
      ...ChatsForDisplay
    }
  }
  fragment ChatsForDisplay on Chat {
    id
    ...ChatItem
    createdBy {
      id
      username
    }
    ... on DirectMessageChat {
      friend {
        id
        username
        name
      }
    }
  }
  ${ChatItem.fragments.chat}
`;

const useLiveChats = () => {
  const { data, subscribeToMore, loading } = useGetChatsForDisplayQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore<ChatsForDisplayChangedSubscription>({
      document: ChatsForDisplayChangedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const chat = subscriptionData.data;
        const newCache = Object.assign({}, prev, {
          chats: [
            ...prev.chats.filter((x) => x.id !== chat.chats.id),
            chat.chats,
          ],
        } as GetChatsForDisplayQuery);
        return newCache;
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  return {
    chats: data?.chats ?? [],
    loading,
  };
};

export default useLiveChats;
