import ChatPanel from 'components/Chat/ChatPanel/ChatPanel';
import LoggedInProvider from 'components/Providers/LoggedInProvider';
import { ChatContext } from 'context/ChatContext';
import { useLiveChats } from 'hooks';
import { useParams } from 'react-router-dom';
import PickChat from 'components/Chat/PickChat';
import { Button, Center, Group, Text } from '@mantine/core';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModel';

const Chats = () => {
  const openCreateChatModal = useCreateGroupChatModal();
  return (
    <Center
      style={{
        height: '100%',
      }}
    >
      <Group spacing={'xs'}>
        <Text>Select or</Text>
        <Button onClick={openCreateChatModal} variant={'light'} compact>
          Create a Chat
        </Button>
      </Group>
    </Center>
  );
};

export default Chats;
