import {
  Drawer as MantineDrawer,
  Group,
  MediaQuery,
  Stack,
  Title,
} from '@mantine/core';
import { useUser } from 'context/UserContext';
import ChatDisplay from 'components/ChatDisplay';
import { UserAvatar } from 'components/shared/Avatars';
import { useDrawer } from 'store';

const ChatDrawer = () => {
  const { user } = useUser();
  const { isOpen, toggle } = useDrawer();

  return (
    <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
      <MantineDrawer
        opened={isOpen}
        onClose={toggle}
        zIndex={99}
        withinPortal={false}
        size={'lg'}
        styles={{
          drawer: {
            marginTop: '70px',
          },
          root: {
            marginTop: '70px',
          },
        }}
        padding={10}
        overlayOpacity={0}
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        {user && (
          <Stack spacing={'md'}>
            <Group>
              <UserAvatar
                size="md"
                user={user}
                style={{ marginTop: 'auto' }}
                dropdown={{ style: { display: 'none' } }}
              />
              <Title order={5}>{user?.username}</Title>
            </Group>
            <ChatDisplay />
          </Stack>
        )}
      </MantineDrawer>
    </MediaQuery>
  );
};

export default ChatDrawer;