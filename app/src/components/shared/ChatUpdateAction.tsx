import { gql } from '@apollo/client';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { useChat } from 'context/ChatContext';
import { useGetChatForChatUpdateActionQuery } from 'graphql/generated/graphql';
import { Settings } from 'tabler-icons-react';

gql`
  query GetChatForChatUpdateAction($chatId: HashId!) {
    chat(chatId: $chatId) {
      ... on GroupChat {
        isAdmin
      }
    }
  }
`;

const ChatUpdateAction = () => {
  const { chatId } = useChat();
  const { loading, data } = useGetChatForChatUpdateActionQuery({
    variables: {
      chatId,
    },
  });
  const openGroupChatUpdate = useUpdateGroupChatModal();

  const chat = data?.chat;

  let disabled = true;

  if (chat?.__typename === 'GroupChat' && !loading) {
    if (chat.isAdmin) {
      disabled = false;
    }
  }

  return (
    <Tooltip label={disabled ? 'Unauthorized' : 'Update'}>
      <ActionIcon
        size={'xs'}
        color={'blue'}
        disabled={disabled}
        onClick={() => {
          if (chat?.__typename === 'GroupChat') {
            openGroupChatUpdate({ chatId });
          }
        }}
      >
        <Settings />
      </ActionIcon>
    </Tooltip>
  );
};

export default ChatUpdateAction;
