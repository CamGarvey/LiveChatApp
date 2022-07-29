import { useAuth0 } from '@auth0/auth0-react';
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Drawer as MantineDrawer,
  Group,
  Loader,
  MediaQuery,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useEffect } from 'react';
import { Logout, Search, SquarePlus } from 'tabler-icons-react';
import { useGetMeLazyQuery } from '../../graphql/generated/graphql';
import { ModalType } from '../../models';
import { useToggleDrawer, useIsDrawerOpen } from '../store';
import ChatItem from '../shared/ChatItem';
import { useUserSearchModal } from '../Modals/UserSearchModal';
import ChatDisplay from '../shared/ChatDisplay';
import { useCreateGroupChatModal } from '../Modals/CreateGroupChatModal';
import { useUser } from '../../context/UserContext';

const Drawer = () => {
  const { isAuthenticated, logout } = useAuth0();
  const { user, isLoading } = useUser();
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();

  const openCreateChatModal = useCreateGroupChatModal();
  const openUserSearchModal = useUserSearchModal();

  return (
    <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
      <MantineDrawer
        opened={isDrawerOpen}
        onClose={toggleDrawer}
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
                  <Avatar
                    size="md"
                    src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
                    style={{ marginTop: 'auto' }}
                  />
                  <Title order={5}>{user.username}</Title>
                  <Group ml={'auto'}>
                    <ActionIcon
                      onClick={() => {
                        toggleDrawer();
                        openUserSearchModal();
                      }}
                    >
                      <Search />
                    </ActionIcon>
                    <ActionIcon onClick={() => logout()}>
                      <Logout />
                    </ActionIcon>
                  </Group>
                </Group>

                <Group>
                  <Text>Chats</Text>
                  <ActionIcon
                    ml={'auto'}
                    onClick={() => {
                      toggleDrawer();
                      openCreateChatModal();
                    }}
                  >
                    <SquarePlus />
                  </ActionIcon>
                </Group>
                <ScrollArea>
                  <ChatDisplay onChatClick={toggleDrawer} />
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
