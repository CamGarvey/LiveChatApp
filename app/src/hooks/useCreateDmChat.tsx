import { gql } from '@apollo/client';
import { useUser } from 'context/UserContext';
import {
  GetChatsForDisplayDocument,
  GetChatsForDisplayQuery,
  useCreateDirectMessageChatMutation,
} from 'graphql/generated/graphql';
import { useNavigate } from 'react-router-dom';

gql`
  mutation CreateDirectMessageChat($friendId: HashId!) {
    createDirectMessageChat(friendId: $friendId) {
      id
      isCreator
      createdAt
      friend {
        id
        name
        username
      }
    }
  }
`;

export const useCreateDmChat = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const create = useCreateDirectMessageChatMutation({
    update: (cache, { data: { createDirectMessageChat } }) => {
      const { chats } = cache.readQuery<GetChatsForDisplayQuery>({
        query: GetChatsForDisplayDocument,
      });

      if (
        !chats.find(
          (x) =>
            x.__typename === 'DirectMessageChat' &&
            x.friend.id === createDirectMessageChat.friend.id
        )
      ) {
        const updatedChats = [
          ...chats,
          {
            createdBy: {
              __typename: 'Me',
              ...user,
            },
            ...createDirectMessageChat,
          },
        ];
        cache.writeQuery({
          query: GetChatsForDisplayDocument,
          data: {
            chats: updatedChats,
          },
        });
      }
    },
    onCompleted: (data) => {
      navigate(`/chats/${data.createDirectMessageChat?.id}`, { replace: true });
    },
  });

  return create;
};
