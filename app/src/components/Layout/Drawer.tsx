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
import ChannelItem from '../shared/ChannelItem';
import { useUserSearchModal } from '../Modals/UserSearchModal';
import ChannelDisplay from '../shared/ChannelDisplay';
import { useCreateChannelModal } from '../Modals/CreateChannelModal';
import { useUser } from '../../context/UserContext';

const Drawer = () => {
  const { isAuthenticated, logout } = useAuth0();
  const { user, isLoading } = useUser();
  const isDrawerOpen = useIsDrawerOpen();
  const toggleDrawer = useToggleDrawer();

  const openCreateChannelModal = useCreateChannelModal();
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
                  <Text>Channels</Text>
                  <ActionIcon
                    ml={'auto'}
                    onClick={() => {
                      toggleDrawer();
                      openCreateChannelModal();
                    }}
                  >
                    <SquarePlus />
                  </ActionIcon>
                </Group>
                <ChannelDisplay onChannelClick={toggleDrawer} />
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
