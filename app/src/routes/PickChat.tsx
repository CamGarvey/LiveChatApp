import { Button, Center, Group, Text } from '@mantine/core';
import { useCreateChannelModal } from '../components/Modals/CreateChannelModal';

const PickChat = () => {
  const openCreateChannelModal = useCreateChannelModal();
  return (
    <Center
      style={{
        height: '100%',
      }}
    >
      <Group spacing={'xs'}>
        <Text>Select or</Text>
        <Button onClick={openCreateChannelModal} variant={'light'} compact>
          Create a Channel
        </Button>
      </Group>
    </Center>
  );
};

export default PickChat;
