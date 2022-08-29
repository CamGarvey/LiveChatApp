import { useAuth0 } from '@auth0/auth0-react';
import {
  ActionIcon,
  Drawer as MantineDrawer,
  Group,
  MediaQuery,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconLogout, IconSearch, IconSquarePlus } from '@tabler/icons';
import { useUserSearchModal } from 'components/Modals/UserSearchModal/UserSearchModal';
import { useCreateGroupChatModal } from 'components/Modals/CreateGroupChatModel/CreateGroupChatModal';
import { useUser } from 'context/UserContext';
import ChatDisplay from 'components/shared/ChatDisplay';
import UserAvatar from 'components/shared/UserAvatar';
import { useDrawer } from 'store';

const Drawer = () => {
  const { isAuthenticated, logout } = useAuth0();
  const { user, isLoading } = useUser();
  const { isOpen, toggle } = useDrawer();

  const openCreateChatModal = useCreateGroupChatModal();
  const openUserSearchModal = useUserSearchModal();

  return (
    <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
      <MantineDrawer
        opened={isOpen}
        onClose={toggle}
        zIndex={9999}
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
                    <ActionIcon
                      onClick={() => {
                        toggle();
                        openUserSearchModal();
                      }}
                    >
                      <IconSearch />
                    </ActionIcon>
                    <ActionIcon onClick={() => logout()}>
                      <IconLogout />
                    </ActionIcon>
                  </Group>
                </Group>

                <Group>
                  <Text>Chats</Text>
                  <ActionIcon
                    ml={'auto'}
                    onClick={() => {
                      toggle();
                      openCreateChatModal();
                    }}
                  >
                    <IconSquarePlus />
                  </ActionIcon>
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
