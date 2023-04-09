import { gql } from '@apollo/client';
import { useUser } from 'context/UserContext';
import {
  GetChatsForChatDisplayDocument,
  GetChatsForChatDisplayQuery,
  useCreateDirectMessageChatMutation,
  useCreateGroupChatMutation,
} from 'graphql/generated/graphql';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

gql`
  mutation CreateGroupChat($data: CreateGroupChatInput!) {
    createGroupChat(createGroupChatData: $data) {
      id
      name
      createdBy {
        id
        name
        username
      }
    }
  }
  mutation CreateDirectMessageChat($receipentUserId: HashId!) {
    createDirectMessageChat(receipentUserId: $receipentUserId) {
      id
      isCreator
      createdAt
      receipent {
        id
        user {
          name
          username
        }
      }
    }
  }
`;

export const useCreateChat = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const navigateToChat = useCallback(
    (chatId: string) => {
      navigate(`/chats/${chatId}`, { replace: true });
    },
    [navigate]
  );

  const createGroupChat = useCreateGroupChatMutation({
    update: (cache, { data }) => {
      const query = cache.readQuery<GetChatsForChatDisplayQuery>({
        query: GetChatsForChatDisplayDocument,
      });

      if (!query) {
        throw new Error('Could not find query');
      }

      if (!data) {
        throw new Error('No data');
      }

      const updatedChats = [
        ...query.chats,
        {
          createdBy: {
            __typename: 'Me',
            ...user,
          },
          ...data.createGroupChat,
        },
      ];

      cache.writeQuery({
        query: GetChatsForChatDisplayDocument,
        data: {
          chats: updatedChats,
        },
      });
    },
    onCompleted: (data) => navigateToChat(data.createGroupChat?.id),
  });

  const createDirectMessageChat = useCreateDirectMessageChatMutation({
    update: (cache, { data }) => {
      const query = cache.readQuery<GetChatsForChatDisplayQuery>({
        query: GetChatsForChatDisplayDocument,
      });

      if (!query) {
        throw new Error('No query');
      }

      const friend = data?.createDirectMessageChat?.friend;

      if (!friend) {
        throw new Error('No friend in mutation response');
      }

      if (
        !query.chats.find(
          (x) =>
            x.__typename === 'DirectMessageChat' && x.friend.id === friend.id
        )
      ) {
        const updatedChats = [
          ...query.chats,
          {
            createdBy: {
              __typename: 'Me',
              ...user,
            },
            ...data.createDirectMessageChat,
          },
        ];
        cache.writeQuery({
          query: GetChatsForChatDisplayDocument,
          data: {
            chats: updatedChats,
          },
        });
      }
    },
    onCompleted: (data) => navigateToChat(data.createDirectMessageChat?.id),
  });

  return { createGroupChat, createDirectMessageChat };
};
