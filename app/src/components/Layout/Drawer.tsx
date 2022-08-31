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
  Title,
} from '@mantine/core';
import { IconSearch, IconMessageDots } from '@tabler/icons';
import { useUserSearchModal } from 'components/Modals/UserSearchModal/UserSearchModal';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModel/CreateGroupChatModal';
import { useUser } from 'context/UserContext';
import ChatDisplay from 'components/shared/ChatDisplay';
import UserAvatar from 'components/shared/UserAvatar';
import { useDrawer } from 'store';

const Drawer = () => {
  const { isAuthenticated } = useAuth0();
  const { user, isLoading } = useUser();
  const { isOpen, toggle } = useDrawer();

  const openCreateChatModal = useCreateGroupChatModal();
  const openUserSearchModal = useUserSearchModal();

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
        {isAuthenticated ? (
          <>
            {isLoading || user == null ? (
              <Group>
                <Skeleton circle />
                <Skeleton />
              </Group>
            ) : (
              <Stack spacing={'md'}>
                <Group>
                  <UserAvatar
                    size="md"
                    user={user}
                    style={{ marginTop: 'auto' }}
                  />
                  <Title order={5}>{user.username}</Title>
                  <Group ml={'auto'}>
                    <Button
                      onClick={() => {
                        toggle();
                        openCreateChatModal();
                      }}
                      radius={'xl'}
                    >
                      <IconMessageDots />
                    </Button>
                  </Group>
                </Group>
                <ScrollArea sx={{ height: 'calc(100vh - 200px)' }}>
                  <ChatDisplay onChatClick={toggle} />
                </ScrollArea>
              </Stack>
            )}
          </>
        ) : (
          <>Login!</>
        )}
      </MantineDrawer>
    </MediaQuery>
  );
};

export default Drawer;
