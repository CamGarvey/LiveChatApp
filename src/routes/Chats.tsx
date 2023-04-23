import { Button, Center, Group, Text } from '@mantine/core';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModal';

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
