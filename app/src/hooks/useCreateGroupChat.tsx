import { gql } from '@apollo/client';
import { useUser } from 'context/UserContext';
import {
  GetChatsForChatDisplayDocument,
  GetChatsForChatDisplayQuery,
  useCreateGroupChatMutation,
} from 'graphql/generated/graphql';
import { useNavigate } from 'react-router-dom';

gql`
  mutation CreateGroupChat($data: CreateGroupChatInput!) {
    createGroupChat(data: $data) {
      id
      name
      createdBy {
        id
        name
        username
      }
    }
  }
`;

export const useCreateGroupChat = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const create = useCreateGroupChatMutation({
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
    onCompleted: (data) => {
      navigate(`/chats/${data.createGroupChat?.id}`, { replace: true });
    },
  });

  return create;
};
