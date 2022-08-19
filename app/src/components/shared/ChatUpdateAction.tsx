import { ActionIcon, Tooltip } from '@mantine/core';
import { useUpdateGroupChatModal } from 'components/Modals/UpdateGroupChatModal';
import { useChat } from 'context/ChatContext';
import { Settings } from 'tabler-icons-react';

const ChatUpdateAction = () => {
  const { chat, isLoading } = useChat();
  const openGroupChatUpdate = useUpdateGroupChatModal();

  let disabled = true;

  if (chat?.__typename === 'GroupChat' && !isLoading) {
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
            openGroupChatUpdate({ chat });
          }
        }}
      >
        <Settings />
      </ActionIcon>
    </Tooltip>
  );
};

export default ChatUpdateAction;
