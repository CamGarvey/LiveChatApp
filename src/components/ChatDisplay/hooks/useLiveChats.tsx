import { gql } from '@apollo/client';
import {
  ChatsForChatDisplayDocument,
  ChatsForChatDisplaySubscription,
  DirectMessageChatItemFragment,
  GetChatsForChatDisplayQuery,
  GroupChatItemFragment,
  useGetChatsForChatDisplayQuery,
} from 'graphql/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import DirectMessageChatItem from '../DirectMessageChatItem';
import GroupChatItem from '../GroupChatItem';
import { useNavigate } from 'react-router-dom';

gql`
  query GetChatsForChatDisplay($firstMembers: Int = 2, $afterMember: String) {
    chats {
      ...ChatDisplayChat
    }
  }
  subscription ChatsForChatDisplay(
    $firstMembers: Int = 2
    $afterMember: String
  ) {
    chats {
      ...ChatDisplayChat
    }
  }

  fragment ChatDisplayChat on Chat {
    id
    createdBy {
      id
      username
    }
    ... on GroupChat {
      ...GroupChatItem
    }
    ... on DirectMessageChat {
      ...DirectMessageChatItem
      receipent {
        id
        user {
          id
          username
          name
        }
      }
    }
  }
  ${DirectMessageChatItem.fragments.chat}
  ${GroupChatItem.fragments.chat}
`;

export const useLiveChats = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');

  const { loading, data, subscribeToMore } = useGetChatsForChatDisplayQuery();

  useEffect(() => {
    const unsubscribe = subscribeToMore<ChatsForChatDisplaySubscription>({
      document: ChatsForChatDisplayDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const chat = subscriptionData.data.chats;

        if (!chat) {
          throw new Error('Update query failed, no chat found');
        }

        switch (chat.__typename) {
          case 'ForbiddenChat':
          case 'DeletedChat':
            navigate('/chats', { replace: true });
            return Object.assign({}, prev, {
              chats: prev.chats.filter((x) => x.id !== chat.id),
            } as GetChatsForChatDisplayQuery);
          case 'DirectMessageChat':
          case 'GroupChat':
            return Object.assign({}, prev, {
              chats: [prev.chats.filter((x) => x.id !== chat.id), chat],
            } as GetChatsForChatDisplayQuery);
          default:
            return prev;
        }
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore, navigate]);

  const filteredChats = useMemo(
    () =>
      data?.chats?.filter((chat) => {
        if (chat.__typename === 'GroupChat') {
          return chat.name.toLowerCase().includes(filter);
        }
        if (chat.__typename === 'DirectMessageChat') {
          return (
            chat.receipent.user.username.toLowerCase().includes(filter) ||
            chat.receipent.user.name?.toLowerCase().includes(filter)
          );
        }
        return false;
      }) ?? [],
    [data?.chats, filter]
  );

  const group = useMemo(
    () =>
      filteredChats.filter(
        (c) => c.__typename === 'GroupChat'
      ) as GroupChatItemFragment[],
    [filteredChats]
  );

  const direct = useMemo<DirectMessageChatItemFragment[]>(
    () =>
      filteredChats.filter(
        (c) => c.__typename === 'DirectMessageChat'
      ) as DirectMessageChatItemFragment[],
    [filteredChats]
  );

  return {
    group,
    direct,
    setFilter,
    loading,
  };
};
