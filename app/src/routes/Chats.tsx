import { Button, Center, Group, Text } from '@mantine/core';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModel';
import { useChatId } from 'store';

const Chats = () => {
  const openCreateChatModal = useCreateGroupChatModal();
  const { setChatId } = useChatId();
  setChatId(null);
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
