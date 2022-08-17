import { showNotification } from '@mantine/notifications';
import { useUser } from 'context/UserContext';
import {
  GetChatsDocument,
  GetChatsQuery,
  useCreateGroupChatMutation,
} from 'graphql/generated/graphql';

export const useCreateChat = () => {
  const { user } = useUser();

  const create = useCreateGroupChatMutation({
    update: (cache, { data: { createGroupChat } }) => {
      const { chats } = cache.readQuery<GetChatsQuery>({
        query: GetChatsDocument,
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
        query: GetChatsDocument,
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
