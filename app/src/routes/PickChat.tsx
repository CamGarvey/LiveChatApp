import { Button, Center, Group, Text } from '@mantine/core';
import { useCreateChatModal } from '../components/Modals/CreateChatModal';

const PickChat = () => {
  const openCreateChatModal = useCreateChatModal();
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

export default PickChat;
