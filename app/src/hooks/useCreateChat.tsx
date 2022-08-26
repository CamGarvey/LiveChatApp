import { gql } from '@apollo/client';
import { showNotification } from '@mantine/notifications';
import { useUser } from 'context/UserContext';
import {
  GetChatsForDisplayDocument,
  GetChatsForDisplayQuery,
  useCreateGroupChatMutation,
} from 'graphql/generated/graphql';

gql`
  mutation CreateGroupChat($data: CreateGroupChatInput!) {
    createGroupChat(data: $data) {
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

  const create = useCreateGroupChatMutation({
    update: (cache, { data: { createGroupChat } }) => {
      const { chats } = cache.readQuery<GetChatsForDisplayQuery>({
        query: GetChatsForDisplayDocument,
      });

      const updatedChats = [
        ...chats,
        {
          createdBy: {
            __typename: 'Me',
            ...user,
          },
          ...createGroupChat,
        },
      ];

      cache.writeQuery({
        query: GetChatsForDisplayDocument,
        data: {
          chats: updatedChats,
        },
      });
    },
    onCompleted: (data) =>
      showNotification({
        title: 'Created New Chat',
        message: data.createGroupChat.name,
      }),
  });

  return create;
};
