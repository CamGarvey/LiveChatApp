import { useAuth0 } from '@auth0/auth0-react';
import {
  ActionIcon,
  Button,
  Drawer as MantineDrawer,
  Group,
  MediaQuery,
  ScrollArea,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { IconMessageDots, IconUsers, IconUser } from '@tabler/icons';
import { useUserSearchModal } from 'components/Modals/UserSearchModal/UserSearchModal';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModel/CreateGroupChatModal';
import { useUser } from 'context/UserContext';
import ChatDisplay from 'components/ChatDisplay';
import UserAvatar from 'components/shared/UserAvatar';
import { useDrawer } from 'store';

const Drawer = () => {
  const { user } = useUser();
  const { isOpen, toggle } = useDrawer();

  return (
    <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
      <MantineDrawer
        opened={isOpen}
        onClose={toggle}
        zIndex={99}
        withinPortal={false}
        size={'xl'}
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
              <UserAvatar size="md" user={user} style={{ marginTop: 'auto' }} />
              <Title order={5}>{user?.username}</Title>
            </Group>
            <ScrollArea sx={{ height: 'calc(100vh - 200px)' }}>
              <ChatDisplay />
            </ScrollArea>
          </Stack>
        )}
      </MantineDrawer>
    </MediaQuery>
  );
};

export default Drawer;
