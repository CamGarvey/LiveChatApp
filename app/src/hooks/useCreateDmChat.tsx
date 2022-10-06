import { gql } from '@apollo/client';
import { useUser } from 'context/UserContext';
import {
  GetChatsForChatDisplayDocument,
  GetChatsForChatDisplayQuery,
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
    onCompleted: (data) => {
      navigate(`/chats/${data.createDirectMessageChat?.id}`, { replace: true });
    },
  });

  return create;
};
